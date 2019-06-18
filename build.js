/**
 * 自动化构建、自动化部署脚本
 * 构建部署过程如下：
 * 检测当前源码分支是否是待构建部署分支
 * 把有源码改动的项目加入待构建列表
 * 判断是否有源码改动的项目
 * 对应 CDN 仓库准备好对应分支
 * 对应 CDN 仓库更新分支代码到最新
 * 构建项目
 * 每次提交代码到 CDN 仓库前，更新分支代码到最新
 * （提交前更新是为了尽量避免自动构建期间有新人工提交导致自动提交失败，如果有冲突需要手动解决冲突再重新触发自动构建脚本）
 * 提交构建后的文件到 CDN 仓库
 * 如果是测试分支，自动部署到对应测试环境
 * 重置构建过程导致的源码仓库改动
 * 提交新的项目源码 md5 校验结果到源码仓库
 * 如果是 master 分支并且已配置 fundebug apikey，则提交 sourcemap 文件到 fundebug 平台
 * 完成一个项目的自动构建部署
 * 从【构建项目】步骤开始下一个项目的构建部署
 * 如果是周五，则把旧的测试分支删除掉（周五判断即可，不用每天都判断。旧的测试分支指上周之前的测试分支，保留最多一周测试分支即可）
 */

/* eslint-disable import/no-commonjs */

// 为了保证构建部署过程的逻辑严谨性，任何导致构建部署失败的结果出现时，都马上抛出错误终止程序

const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const request = require('request');
const low = require('lowdb');
const argv = require('yargs').argv;
const FileSync = require('lowdb/adapters/FileSync');

let adapter = new FileSync('build.hash.json');
let db = low(adapter);

// CDN 仓库名称
let CDNRepoName;
// CDN 仓库地址
let CDNRepoPath;
// 缓存 commit message（因为此信息获取逻辑繁琐且多次用到，故做代码层面缓存）
let cacheCommitMsg;

let projects = require('./build.project.json');
let buildConfig = require('./build.config');
if (argv.t) {
  projects = require('./build.project.dev.json');
  buildConfig = require('./build.config.dev');
}

let buildBranches = buildConfig.BUILD_BRANCHES;
let currentBranch = argv.currentBranch;

console.log(chalk.green('buildBranches = ' + buildBranches.join(', ')));
console.log(chalk.green('currentBranch = ' + currentBranch));

// 检测当前源码分支是否是待构建部署分支
function checkBranch() {
  if (buildBranches.indexOf(currentBranch) === -1) {
    console.log(chalk.red(`当前分支为 ${currentBranch}，无需做自动化构建部署`));
    return false;
  }
  return true;
}

// 把有源码改动的项目加入待构建列表
function addBuildProjects() {
  // 检测项目的源码是否有改动
  let checkProjectMd5sum = function(project) {
    let uname = shelljs.exec(`uname -a`, { silent: true }).stdout.trim();
    // https://unix.stackexchange.com/questions/35832/how-do-i-get-the-md5-sum-of-a-directorys-contents-as-one-sum
    // `tar --exclude ${project.path}/node_modules -cf - ${project.path} | md5sum`
    // 一定要保证对比时的 md5sum 是在同一类型 uname 的系统下生成的，比如 mac 下的 md5 校验结果不能和 centos 下的 md5 校验结果对比
    let md5sumCMD = `find -s ${project.path} -path ${
      project.path
    }/node_modules -prune -o  -type f -exec md5sum {} \\; | md5sum`;
    if (uname.indexOf('GNU/Linux') !== -1) {
      md5sumCMD = `find ${project.path} -path ${
        project.path
      }/node_modules -prune -o  -type f -exec md5sum {} \\; | sort -k 2 | md5sum`;
    }
    let projectFileContentMd5 = shelljs.exec(md5sumCMD).stdout.trim();
    if (db.get(project.path).value() === projectFileContentMd5) {
      // 项目源码无改动
      return false;
    }
    console.log(chalk.green(`项目 ${project.path} 源码有改动或者是新项目`));
    // 返回该项目源码新的 md5 校验和
    return projectFileContentMd5;
  };
  // 需构建部署的项目
  let buildProjects = [];
  for (const key in projects) {
    if (projects.hasOwnProperty(key)) {
      let project = projects[key];
      project.path = project.path.replace(/^\/|\/$/g, '');
      let md5sum = checkProjectMd5sum(project);
      if (md5sum) {
        buildProjects.push({
          name: key,
          path: project.path,
          md5sum: md5sum,
        });
      }
    }
  }
  return buildProjects;
}

// 判断是否有源码改动的项目
function checkBuildProjects(buildProjects, specifyProjectName) {
  if (!buildProjects.length) {
    // 无项目改动，无需构建
    if (specifyProjectName) {
      console.log(`指定的项目 ${specifyProjectName} 无源码改动，无需自动构建部署`);
    } else {
      console.log('此次提交无项目源码改动，无需自动构建部署');
    }
    return false;
  }
  if (buildProjects.length > 1) {
    // 每次提交只允许有一个项目改动
    throw new Error(`每次提交只允许有一个项目改动，此次提交存在改动的项目有 ${buildProjects.length} 个`);
  }
  return true;
}

// 对应 CDN 仓库准备好对应分支
function setupCDNRepoBranch(currentBranch) {
  if (currentBranch === 'master') {
    CDNRepoName = 'static-public-master';
  } else {
    let repoIndex = currentBranch.split('_')[1];
    CDNRepoName = `static-public-develop-${repoIndex}`;
  }
  CDNRepoPath = buildConfig.CDN_REPO_PATH[CDNRepoName];
  // 拉取 static-public 仓库，并切换分支到当周测试分支或 master 分支
  console.log(chalk.green(`git fetching ${CDNRepoPath}`));
  console.log(chalk.green('CDNRepoPath = ' + CDNRepoPath));
  // 尝试切换 CDN 仓库分支为当前待构建部署分支
  let checkoutBranchCode = shelljs.exec(
    `cd ${CDNRepoPath} && git fetch --all --prune && git checkout ${currentBranch}`,
    {
      silent: true,
    }
  ).code;
  console.log(chalk.green('checkoutBranchCode = ' + checkoutBranchCode));
  if (checkoutBranchCode === 0) {
    console.log(chalk.green('CDN 仓库分支切换为 ' + currentBranch));
  } else {
    // 以下为 checkoutBranchCode 不为 0 时，新建 CDN 仓库分支过程
    // 注意：checkoutBranchCode 不为 0 不代表一定是不存在分支导致报错，
    // 可能是因为 cd CDNRepoPath 报错或者 git fetch --all --prune 报错，此处暂不考虑此极端情况

    // CDN 仓库新建当前待构建部署分支，一定要从 master 分支新建分支，并且要在最新的 master 基础上新建分支
    let createBranchCode = shelljs.exec(
      `cd ${CDNRepoPath} && git checkout master && git pull origin master && git checkout -b ${currentBranch}`,
      {
        silent: true,
      }
    ).code;
    console.log(chalk.green('createBranchCode = ' + createBranchCode));
    if (createBranchCode === 0) {
      // 完成新建分支
      console.log(chalk.green(`CDN 仓库已新建分支：${currentBranch}`));
      // 把新建分支推送到远程
      let pushBranchCode = shelljs.exec(`cd ${CDNRepoPath} && git push origin ${currentBranch}`, {
        silent: true,
      }).code;
      console.log(chalk.green('pushBranchCode = ' + pushBranchCode));
      if (pushBranchCode === 0) {
        console.log(chalk.green(`${currentBranch} 分支已推送到远程 CDN 仓库`));
      } else {
        throw new Error(`CDN 仓库分支 ${currentBranch} 推送失败`);
      }
    } else {
      throw new Error(`CDN 仓库新建分支 ${currentBranch} 失败`);
    }
  }
  return true;
}

// 对应 CDN 仓库更新分支代码到最新
function updateCDNRepo() {
  let pullBranchCode = shelljs.exec(`cd ${CDNRepoPath} && git pull origin ${currentBranch}`, {
    silent: true,
  }).code;
  console.log(chalk.green('pullBranchCode = ' + pullBranchCode));
  if (pullBranchCode === 0) {
    console.log(chalk.green(`CDN 仓库分支 ${currentBranch} 更新成功`));
  } else {
    throw new Error(`CDN 仓库分支 ${currentBranch} 更新失败`);
  }
  return true;
}

// 删除旧的测试分支
function deleteUselessDevBranches(repoName) {
  console.log(`开始检测并删除 ${repoName} 仓库的旧测试分支`);
  let today = moment().format('YYYY-MM-DD');
  let weekFriday = moment()
    .isoWeekday(5)
    .format('YYYY-MM-DD');
  if (today !== weekFriday) {
    console.log(`当前日期（${today}）不是当周周五（${weekFriday}），无需走自动删除旧测试分支逻辑`);
    return;
  }
  let repoPath = `.`; // 默认是源码仓库路径，即当前路径
  if (repoName === 'static-public') {
    repoPath = CDNRepoPath;
  }
  let remoteBranches = shelljs
    .exec(`cd ${repoPath} && git fetch --all --prune && git branch -r`, {
      silent: true,
    })
    .split('\n');
  let uselessDevBranches = [];
  let deleteDevBranchesCMD = [];
  remoteBranches.forEach(function(v) {
    v = v.replace('  origin/', '');
    // 此处的判断要特别严谨，防止把不该删除的分支删了！！！
    if (v.match(new RegExp('develop/\\d{4}-\\d{2}-\\d{2}_\\d', 'i')) && buildBranches.indexOf(v) === -1) {
      deleteDevBranchesCMD.push(`git push origin :${v}`);
      uselessDevBranches.push(v);
    }
  });
  if (!uselessDevBranches.length) {
    console.log(`${repoName} 仓库目前没有待删除的旧测试分支`);
  } else {
    let deleteDevBranchesCode = shelljs.exec(`cd ${repoPath} && ${deleteDevBranchesCMD.join(' && ')}`).code;
    console.log(chalk.green('deleteDevBranchesCode = ' + deleteDevBranchesCode));
    if (deleteDevBranchesCode === 0) {
      console.log(`${repoName} 仓库已删除旧测试分支：${uselessDevBranches.join(', ')}`);
    } else {
      throw new Error(`${repoName} 仓库删除旧测试分支时出现错误`);
    }
  }
}

// 获取 commit message
// 获取 commit message 方案如下：
// 如果当前提交不是 dev 分支的自动合并提交，则获取当前提交的 commit message
// 如果当前提交是 dev 分支的自动合并提交，则获取合并前 feature 分支的最新 commit message
function getCommitMsg() {
  if (cacheCommitMsg) {
    return cacheCommitMsg;
  }
  let latestCommitID = shelljs.exec(`git log --format="%H" -n 1`).stdout.trim();
  let commitMsg = shelljs.exec(`git rev-list --format=%B --max-count=1 HEAD`, { silent: true }).stdout;
  if (currentBranch !== 'master') {
    // 目前情况下的待构建部署分支，只有 master 分支和 dev 分支，所以非 master 分支就是 dev 分支
    // 如果是 dev 分支自动 merge 分支操作，需要取 merge 前分支的最新 commit message
    let mRes = commitMsg.match(new RegExp(`Merge branch \'(.*)\' into [']?${currentBranch}[']?$`, 'm'));
    if (mRes && mRes.length > 1) {
      // 此时表示当前提交为自动合并分支提交
      let mergedBranch = mRes[1];
      console.log(`mergedBranch = ${mergedBranch}`);
      setSourceRepoGitURL();
      let pullMergedBranchCode = shelljs.exec(
        `git fetch --all --prune && git checkout ${mergedBranch} && git pull origin ${mergedBranch}`
      ).code;
      console.log(chalk.green('pullMergedBranchCode = ' + pullMergedBranchCode));
      if (pullMergedBranchCode === 0) {
        console.log(chalk.green(`源码仓库被合并分支 ${mergedBranch} 更新成功`));
      } else {
        throw new Error(`源码仓库被合并分支 ${mergedBranch} 更新失败`);
      }
      let mergedBranchLatestCommitMsg = shelljs
        .exec(`git log --format="%B" -n 1 -b ${mergedBranch}`, { silent: true })
        .stdout.trim();
      commitMsg = mergedBranchLatestCommitMsg;
      // 获取到 commit message 后即恢复当前待构建部署分支
      let resetSourceRepoBranchCode = shelljs.exec(`git checkout ${latestCommitID}`, { silent: true }).code;
      console.log(chalk.green('resetSourceRepoBranchCode = ' + resetSourceRepoBranchCode));
      if (resetSourceRepoBranchCode === 0) {
        console.log(chalk.green(`源码仓库已恢复当前待构建部署分支`));
      } else {
        throw new Error(`源码仓库恢复当前待构建部署分支时出现错误`);
      }
      console.log(`commit message 已重置为 ${mergedBranch} 分支自动合并前的最新 commit message`);
    } else {
      console.log(`当前提交不是 dev 分支自动合并分支提交`);
    }
  } else {
    // 按照 commit message 获取策略，master 分支直接获取最新的 commit message 即可
    console.log(`直接获取 master 分支的最新 commit message`);
  }
  console.log(`====== commit message ======\n${commitMsg}\n====== commit message ======`);
  cacheCommitMsg = commitMsg;
  return commitMsg;
}

// 从 commit message 获取构建时自定义的信息
function getCustomBuildMsgFromCommitMsg() {
  let commitMsg = getCommitMsg();
  let mRes = commitMsg.match(new RegExp('^([PT]=.*)', 'm'));
  let buildMsg = '';
  if (mRes && mRes.length > 1) {
    buildMsg = mRes[1].trim();
  }
  let buildMsgObj = {};
  buildMsg.split(' ').forEach(function(v) {
    v = v.trim();
    let vObj = v.split('=');
    if (vObj.length > 1) {
      buildMsgObj[vObj[0]] = vObj[1];
    }
  });
  return buildMsgObj;
}

// 指定项目
function getSpecifyProject() {
  // 从 commit msg 获取自定义 Git Tag
  let buildMsg = getCustomBuildMsgFromCommitMsg();
  if (buildMsg.P) {
    let projectName = buildMsg.P;
    console.log(`commit message 指定项目为 ${projectName}`);
    // 判断指定项目是否在项目配置文件里
    if (projects[projectName]) {
      let newProjects = {};
      newProjects[projectName] = projects[projectName];
      // 重置项目列表为指定项目，达到只构建部署此项目的目的
      projects = newProjects;
      return projectName;
    } else {
      throw new Error(`build.project.json 不存在指定项目 ${projectName}`);
    }
  } else {
    console.log(`此次提交未指定项目，将自动检测各项目是否需要构建部署`);
  }
  return false;
}

// 获取自定义 Git Tag
function getCustomGitTagName() {
  let buildMsg = getCustomBuildMsgFromCommitMsg();
  if (buildMsg.T) {
    let tag = buildMsg.T;
    console.log(`commit message 指定发布 Git Tag 为 ${tag}`);
    return tag;
  } else {
    console.log(`此次提交未指定 Git Tag`);
  }
  return false;
}

// 提交构建后的文件到 CDN 仓库
function pushCDNRepo(projectName) {
  // 优先取 commit msg 里自定义的 git tag
  let customGitTagName = getCustomGitTagName();
  let autoBuildTagName = customGitTagName || `${projectName}_${moment().format('YYYY/MM/DD/HHmmss')}`;
  if (!customGitTagName) {
    autoBuildTagName = autoBuildTagName.toUpperCase(); // 非自定义的 Git Tag 字母统一大写
  }
  let pushCDNCode = shelljs.exec(
    `cd ${CDNRepoPath} && git add ./ --all && git commit -m '${projectName}: auto build [skip ci]' && git tag ${autoBuildTagName} && git push origin ${currentBranch} --tags`
  ).code;
  console.log(chalk.green('pushCDNCode = ' + pushCDNCode));
  if (pushCDNCode === 0) {
    console.log(chalk.green(`项目 ${projectName} 构建后的文件已推送到远程 CDN 仓库`));
  } else {
    throw new Error(`推送构建文件到 CDN 仓库时出现错误`);
  }
  return autoBuildTagName;
}

// 重置构建过程导致的源码仓库改动
function resetSourceRepo() {
  let resetSourceCode = shelljs.exec(`git reset HEAD --hard`).code;
  console.log(chalk.green('resetSourceCode = ' + resetSourceCode));
  if (resetSourceCode === 0) {
    console.log(chalk.green(`源码仓库的改动重置成功`));
  } else {
    throw new Error(`源码仓库的改动重置失败`);
  }
  return true;
}

// 部署到测试环境
function deployProject(gtiTagName, cb) {
  if (currentBranch.indexOf('develop/') === -1) {
    cb && cb();
    return false;
  }
  // 如果是测试分支，自动部署 CDN 仓库到测试环境
  let url = buildConfig.DEPLOY_URL;
  let repoIndex = currentBranch.split('_')[1];
  let deployProjectIndex = repoIndex == 1 ? '' : '_' + repoIndex;
  let deployProject = `static/static-source.git${deployProjectIndex}`;
  // 使用 git tag 部署
  let deployVersion = gtiTagName;
  let qsObject = {
    env: buildConfig.DEPLOY_ENV, // 暂时只支持测试环境自动化部署
    project: deployProject,
    version: deployVersion,
    api_token: buildConfig.DEPLOY_API_TOKEN, // deploy token
  };
  request({ url: url, qs: qsObject }, function(err, response, body) {
    if (err) {
      console.log(err);
      return false;
    }
    let res = JSON.parse(body);
    if (res.code === 0) {
      console.log(`项目 ${deployProject} 已成功部署到测试环境，部署版本为：${deployVersion}`);
      cb && cb();
    } else {
      throw new Error(
        `项目 ${deployProject} 部署到测试环境时出现错误，部署版本为：${deployVersion}，请到发布平台查看发布失败信息。`
      );
    }
  });
}

// 设置源码仓库 url，统一走 ssh 协议拉取 git 仓库，避免无权限问题
function setSourceRepoGitURL() {
  let setGitURLCode = shelljs.exec(`git remote set-url origin git@github.com:cjl-sky/static-source.git`).code;
  console.log(chalk.green('setGitURLCode = ' + setGitURLCode));
  if (setGitURLCode === 0) {
    console.log(chalk.green(`源码仓库 Git URL 设置成功`));
  } else {
    throw new Error(`源码仓库 Git URL 设置失败`);
  }
}

// 提交新的项目源码 md5 校验结果到源码仓库
function pushProjectMd5sum(project) {
  setSourceRepoGitURL();
  let pullSourceCode = shelljs.exec(`git checkout ${currentBranch} && git pull origin ${currentBranch}`).code;
  console.log(chalk.green('pullSourceCode = ' + pullSourceCode));
  if (pullSourceCode === 0) {
    console.log(chalk.green(`源码仓库更新成功`));
  } else {
    throw new Error(`源码仓库更新失败`);
  }
  // 更新 md5sum（如果文件无变化，新 md5sum 也是原 md5sum，所以这里不区分是否有文件变化，统一更新 md5sum 即可）
  let latestCheckTime = moment().format('YYYY-MM-DD HH:mm:ss');
  db.set(project.path, project.md5sum).write();
  db.set('latest-check-time', latestCheckTime).write();
  let pushSourceCode = shelljs.exec(
    `git add ./build.hash.json && git commit -m '${
      project.path
    }: update build.hash.json [skip ci]' && git push origin ${currentBranch}`
  ).code;
  console.log(chalk.green('pushSourceCode = ' + pushSourceCode));
  if (pushSourceCode === 0) {
    console.log(chalk.green(`项目 ${project.path} 新的 md5 校验结果已推送到远程源码仓库`));
  } else {
    throw new Error(`推送项目 ${project.path} 新的 md5 校验结果时出现错误`);
  }
}

// 上传 Source Map 文件到 Fundebug
function uploadSourceMap(project) {
  if (currentBranch !== 'master') {
    console.log(chalk.green(`当前分支为 ${currentBranch}, 非 master 分支, 无需上传 Source Map 文件`));
    return;
  }
  let packageJsonFilePath = path.join(__dirname, project.path, 'package.json');
  let packageInfo = require(packageJsonFilePath);
  console.log('packageJsonFilePath =', packageJsonFilePath);
  if (!packageInfo.scripts.upload) {
    console.log(chalk.green(`package.json 中的 scripts 中没有设置 "upload" 命令, 不自动上传 Source Map 文件`));
    return;
  }
  console.log(chalk.green(`开始上传 Source Map 文件 ${project.path}`));
  let projectCDNPath = path.join(CDNRepoPath, project.path);
  let uploadSourceMapCMD = `cd ${project.path} && npm run upload -- --staticPublicProjectPath ${projectCDNPath}`;
  let uploadSourceMapCode = shelljs.exec(uploadSourceMapCMD).code;
  if (uploadSourceMapCode !== 0) {
    throw new Error(`项目 ${project.path} 上传 Source Map 文件时发生错误`);
  }
  console.log(chalk.green(`项目 ${project.path} 上传 Source Map 文件成功`));
}

// 构建项目
function build(buildProjects) {
  if (!buildProjects.length) {
    console.log(chalk.green(`所有待构建部署项目都已构建部署完毕`));
    return;
  }
  let project = buildProjects.shift();
  console.log(chalk.green(`开始构建项目 ${project.path}`));
  let projectCDNPath = path.join(CDNRepoPath, project.path);
  let buildCode = shelljs.exec(
    `cd ${project.path} && npm install && npm run prod -- --staticPublicProjectPath ${projectCDNPath}`
  ).code;
  if (buildCode !== 0) {
    throw new Error(`项目 ${project.path} 构建时发生错误`);
  }
  // 构建成功
  console.log(chalk.green(`项目 ${project.path} 构建成功`));
  // 上传 Source Map 文件到 Fundebug
  uploadSourceMap(project);
  // 每次提交代码到 CDN 仓库前，更新分支代码到最新
  updateCDNRepo();
  // 提交构建后的文件到 CDN 仓库
  let gtiTagName = pushCDNRepo(project.path);
  // 部署项目
  deployProject(gtiTagName, function() {
    // 为了保证项目的依赖编译，需要重置构建过程导致的源码仓库改动
    resetSourceRepo();
    // 到了这一步，一个项目的构建部署过程才算完全成功，此时才能更新此项目的 md5sum
    pushProjectMd5sum(project);
    build(buildProjects);
  });
}

// 构建部署主流程
function start() {
  if (!checkBranch()) {
    return;
  }
  let specifyProjectName = getSpecifyProject();
  let buildProjects = addBuildProjects();
  if (!checkBuildProjects(buildProjects, specifyProjectName)) {
    return;
  }
  setupCDNRepoBranch(currentBranch);
  deleteUselessDevBranches('static-public'); // 删除 CDN 仓库无用的测试分支
  deleteUselessDevBranches('static-source'); // 删除源码仓库无用的测试分支
  updateCDNRepo();
  build(buildProjects);
}

// 开始运行主流程
start();

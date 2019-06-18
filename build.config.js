const moment = require('moment');

let weekMonday = moment()
  .isoWeekday(1)
  .format('YYYY-MM-DD');
let weekDevelopBranchs = [`develop/${weekMonday}_1`, `develop/${weekMonday}_2`, `develop/${weekMonday}_3`];
let buildBranches = weekDevelopBranchs.concat(['master']);

const config = {
  DEPLOY_ENV: 'test',
  DEPLOY_URL: 'http://publish.bjmama.com/api/build',
  DEPLOY_API_TOKEN: '54G6bQBhh57pPFSw4GZhCAS4fQbt4ahC',
  BUILD_BRANCHES: buildBranches,
  CDN_REPO_PATH: {
    'static-public-master': '/home/gitlab-runner/static-public-master/',
    'static-public-develop-1': '/home/gitlab-runner/static-public-develop-1/',
    'static-public-develop-2': '/home/gitlab-runner/static-public-develop-2/',
    'static-public-develop-3': '/home/gitlab-runner/static-public-develop-3/',
  },
};

module.exports = config;

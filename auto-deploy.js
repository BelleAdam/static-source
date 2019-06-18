/* eslint-disable import/no-commonjs */

const argv = require('yargs').argv;
const rp = require('request-promise');

let currentBranch = argv.currentBranch;

if (currentBranch === 'develop') {
  let deployURL = 'http://172.16.50.195/auto-deploy/front/';
  let params = {
    env: 'test',
  };
  rp({
    uri: deployURL,
    qs: params,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  })
    .then(function(res) {
      if (res.msg === 'Success') {
        console.log('自动部署成功');
      }
    })
    .catch(function(err) {
      console.log('自动部署失败');
    });
} else {
  console.log(`当前分支不是 develop 分支，无需自动部署`);
}

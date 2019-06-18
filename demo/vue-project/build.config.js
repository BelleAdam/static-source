const path = require('path');

module.exports = {
  projectRelativePath: '/vue-project/',
  outputNamingPattern: 'fixed',
  staticPublicProjectPath: false,
  injectAllFiles: {
    // 配置的文件路径必须是绝对路径
    template: __dirname + '/index.tpl',
    target: false,
  },
  injectStylesFiles: false,
  injectScriptsFiles: false,
  // sourceMap: true,
  // monitorApikey: '6932c309a7ec87001118faa82ac1ba37e096382455d18f2ba640f54a7fd4e01b',
};

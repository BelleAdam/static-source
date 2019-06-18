const path = require('path');

module.exports = {
  projectRelativePath: '/normal-project/',
  outputNamingPattern: 'fixed',
  staticPublicProjectPath: false,
  injectAllFiles: {
    template: path.join(__dirname, 'index.tpl'),
    target: path.join(__dirname, 'index.html')
  },
  injectStylesFiles: false,
  injectScriptsFiles: false
  // sourceMap: true,
  // monitorApikey: '8696c59d62b067c5333fc8085b38f3179bedb9be02d93fc3de76bc0539f7bd67',
};

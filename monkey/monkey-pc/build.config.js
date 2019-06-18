const path = require('path');

module.exports = {
  projectRelativePath: '/monkey/monkey-pc/',
  enableIPHost: false,
  outputNamingPattern: 'fixed',
  staticPublicProjectPath: false,
  dropConsole: false,
  injectAllFiles: false,
  injectStylesFiles: {
    template: false,
    target: path.join(__dirname, './../../../back-source/monkey/_pc/view/_styles.html'),
  },
  injectScriptsFiles: {
    template: false,
    target: path.join(__dirname, './../../../back-source/monkey/_pc/view/_scripts.html'),
  },
};

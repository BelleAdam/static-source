module.exports = {
  projectRelativePath: '/component/',
  cdnHost: 'static-public.thereclub.cn',
  outputNamingPattern: 'fixed',
  staticPublicProjectPath: false,
  injectAllFiles: {
    // 配置的文件路径必须是绝对路径
    template: __dirname + '/index.tpl',
    target: false,
  },
  injectStylesFiles: false,
  injectScriptsFiles: false,
  version: '1.0.1',
  devServerPort: 3791,
  proxyTable: {
    // 因为 act 的接口只允许同域访问, 所以需要做转发
    '/api': {
      target: 'http://act.mama.cn',
      changeOrigin: true,
      headers: {
        Referer: 'http://act.mama.cn/',
      },
    },
  },
};

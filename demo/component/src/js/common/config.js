/**
 * 项目生产环境配置文件
 */

export default {
  API_BASE_URL: '//mama.cn',
  API: {
    GET_QINIU_TOKEN_FROM_ACT: '/api/ext/qiniu/getToken?activity=2018demo&filetype=jpg', // 此接口仅能在 npm run dev 模式下访问
  },
  LOCAL_STORAGE_KEYS: {
    COMPONENT_MUSIC: {
      BOOT_INJECT: 'component-music-boot-inject',
      INJECT_CONF: 'component-music-inject-conf',
    },
  },
};

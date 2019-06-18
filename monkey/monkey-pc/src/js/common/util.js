/**
 * 工具模块
 */

export default {
  getNumber: () => {
    return 100;
  },
  format: (url, ids = {}) => {
    for (let key in ids) {
      let reg = new RegExp(':' + key, 'g');
      url = url.replace(reg, ids[key]);
    }
    return url.replace(/\/\//g, '/');
  },
};

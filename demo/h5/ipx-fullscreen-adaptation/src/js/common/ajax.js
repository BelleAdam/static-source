/**
 * Promise based HTTP client for the browser and node.js
 * 所有 AJAX 请求都要通过此文件暴露出来的 axios 执行
 * @type {Object}
 * @see https://github.com/mzabriskie/axios
 */

import axios from 'axios';
import siteConfig from 'site-config';
import qs from 'qs';

axios.defaults.baseURL = siteConfig.API_BASE_URL;

// 发送请求前做特殊处理
axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        config.params = config.params || {};
        config.data = config.data || {};
        if (config.rawFormData !== false) {
            // 默认支持 rawFormData
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    function(error) {
        // Do something with request error
    }
);

// 返回结果前做特殊处理
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axios;

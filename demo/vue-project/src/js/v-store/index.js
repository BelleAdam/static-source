/**
 * 组装模块并导出 store
 */

import Vue from 'vue';
import Vuex from 'vuex';
import siteConfig from 'site-config';

// modules
import globalStore from 'v-store/module/global';
import mod1 from 'v-store/module/mod1';
import mod2 from 'v-store/module/mod2';

// plugins
import globalPlugin from 'v-store/plugin/global';
import plugin1 from 'v-store/plugin/plugin1';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global: globalStore,
    mod1,
    mod2,
  },
  strict: siteConfig.ENV === 'development' ? true : false,
  plugins: [globalPlugin, plugin1],
});

export default store;

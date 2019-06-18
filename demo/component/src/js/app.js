import 'scss/app.scss';
import 'fe-core/lib/music/music.scss';

import Vue from 'vue';
import router from 'common/router';
import MusicObject from 'fe-core/lib/music/music.vue.js';
import MShare from 'fe-core/lib/mshare';
Vue.use(MusicObject);
new Vue({
  router,
}).$mount('#app');

let mshare = new MShare({
  title: 'fe Demo',
  desc: '展示来自 fe 团队的相关 Demo',
  link: window.location.href,
  imgUrl: '',
  ztID: 193,
});

window.mShare = mshare;

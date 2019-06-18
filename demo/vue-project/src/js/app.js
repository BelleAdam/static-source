// import scss
import 'scss/app.scss';
// import js
import 'common/env-init';
import Vue from 'vue';
import router from 'common/router';
import store from 'v-store/index';

new Vue({
  router,
  store,
}).$mount('#app');

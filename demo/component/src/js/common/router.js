import Vue from 'vue';
import VueRouter from 'vue-router';

import homePage from 'v-component/page/home.vue';
import musicObjectPage from 'v-component/page/music-object.vue';
import mlotteryPage from 'v-component/page/mlottery.vue';
import mcropperPage from 'v-component/page/mcropper.vue';
import msharePage from 'v-component/page/mshare.vue';
import webMapPage from 'v-component/page/webmap.vue';
import mmt from 'v-component/page/mmt.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/music-object',
    component: musicObjectPage,
  },
  {
    path: '/mlottery',
    component: mlotteryPage,
  },
  {
    path: '/mcropper',
    component: mcropperPage,
  },
  {
    path: '/mshare',
    component: msharePage,
  },
  {
    path: '/webmap',
    component: webMapPage,
  },
  {
    path: '/mmt',
    component: mmt,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

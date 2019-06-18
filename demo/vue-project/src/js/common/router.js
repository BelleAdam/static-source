import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// import page components
import userCenterPage from 'v-component/page/user-center.vue';

const routes = [
  {
    path: '/',
    component: userCenterPage,
  },
  {
    path: '/user-center',
    component: userCenterPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

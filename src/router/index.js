import Vue from 'vue';
import VueRouter from 'vue-router';
import MyPage from '@/pages/MyPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MyPage,
  },
  {
    path: '/tiles',
    component: MyPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

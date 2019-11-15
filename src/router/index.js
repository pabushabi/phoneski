import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Calls from "@/views/Calls";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/calls',
    name: 'calls',
    component: Calls
  }
];

const router = new VueRouter({
  routes
});

export default router

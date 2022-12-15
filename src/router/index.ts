/*
 * @Description  :
 * @Author       : Sky
 * @Date         : 2022-12-08 11:27:49
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../page/home.vue'
import About from '../page/about/about.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// createRouter用来新建路由实例
// createWebHashHistor用来配置使用hash模式
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

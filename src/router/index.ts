import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/Details.vue'),
    },
    {
      path: '/trading-alerts',
      name: 'trading-alerts',
      component: () => import('../views/TradingAlerts.vue'),
    },
    {
      path: '/actual',
      name: 'actual',
      component: () => import('../views/Actual.vue'),
    },
    {
      path: '/synchronization',
      name: 'synchronization',
      component: () => import('../views/Synchronization.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
    },
    {
      path: '/tianditu-2d',
      name: 'tianditu-2d',
      component: () => import('../views/Tianditu2DView.vue'),
    },
    {
      path: '/tianditu-3d',
      name: 'tianditu-3d',
      component: () => import('../views/Tianditu3DView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

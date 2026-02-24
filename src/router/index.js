import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BoardList',
      component: () => import('../views/board/BoardList.vue'),
    },
    {
      path: '/board/reg',
      name: 'BoardRegister',
      component: () => import('../views/board/BoardRegister.vue'),
    },
    {
      path: '/board/read/:idx',
      name: 'BoardDetail',
      component: () => import('../views/board/BoardRead.vue'),
    },
  ],
})

export default router

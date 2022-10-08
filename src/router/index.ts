import { createRouter, createWebHistory } from 'vue-router'
// import BlankLayout from '~/layouts/BlankLayout.vue'
import UserLayout from '~/layouts/UserLayout.vue'
import Home from '~/views/Home.vue'
import NotFound from '~/views/404.vue'
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('~/views/Login.vue'),
        meta: {
          title: '登录',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

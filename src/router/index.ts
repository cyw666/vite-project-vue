import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/views/Home.vue'
import NotFound from '~/views/404.vue'
const routes = [
  {
    path: '/',
    component: Home,
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

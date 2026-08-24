import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'
import GroceryList from '../pages/GroceryList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Auth },
    { path: '/register', component: Auth },
    {
      path: '/groceries',
      component: GroceryList,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) next('/login')
  else next()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - ShopVue' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'ShopVue 电商平台'
  
  // 检查是否需要登录
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
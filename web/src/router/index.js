import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 从本地存储中获取用户的登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn && to.name !== 'login') {
    // 如果用户未登录且访问的不是登录页面，重定向到登录页面
    next({ name: 'login' });
  } else {
    // 否则，允许访问
    next();
  }
});

export default router
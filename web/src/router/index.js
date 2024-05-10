import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'

const routes = [
   {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } // 添加这个meta标签，表示这个路由需要认证
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 检查要进入的路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已经登录
    if (localStorage.getItem('isLoggedIn')==='0') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next(); // 如果已经登录，正常跳转
    }
  } else {
    next(); // 如果不需要认证，正常跳转
  }
});

export default router
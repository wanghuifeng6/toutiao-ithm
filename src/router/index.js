// 导入并挂载路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 导入路由规则相应的模块
// 定义路由规则
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      // 设置懒加载
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layout.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/home/index.vue'), name: 'home' },
        { path: '/wd', component: () => import('@/views/wd/index.vue') },
        { path: '/vidio', component: () => import('@/views/vidio/index.vue') },
        { path: '/my', component: () => import('@/views/my/idnex.vue') }
      ]
    },
    { path: '/search', component: () => import('@/views/Search/index.vue'), name: 'search' },
    { path: '*', component: () => import('@/components/Mistake.vue') }
  ]
})

export default router

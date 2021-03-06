/*
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicManage from './BasicManage'
import LabelManage from './LabelManage'
import ShopManage from './ShopManage'
// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  mode: 'hash',
  // 所有路由
  routes: [
    {
      path: '/',
      redirect: "/login",
      component: () => import('../common/Login'), // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      children: [
        {
          path: "login",
          meta: { hidden: true },
          component: () => import('../common/Login')
        }
      ]
    },
    {
      path: '/home',
      redirect: "/home",
      component: () => import('../common/Home'), // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      children: [
        {
          path: "/home",
          meta: { hidden: true },
          component: () => import('../common/Home/Home')
        },
        {
          path: "/home/stock",
          name: "实时库存",
          meta: { hidden: true },
          component: () => import('@/components/ShopManage/stock.vue'),
        },
      ]
    },
    ShopManage,
    LabelManage,
    BasicManage,
    {
      path: "*",
      component: () => ("@/common/notFound/index.vue"),
    }
  ]
})
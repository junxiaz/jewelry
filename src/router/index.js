/*
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicManage from './BasicManage'
import LabelManage from './LabelManage'
import ShopManage from './ShopManage'

const Home = () => import('../common/Home')
const Login = () => import('../common/Login')
// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/',
      redirect: "/login",
      component: Login, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      children: [
        {
          path: "login",
          meta: { hidden: true },
          component: Login
        }
      ]
    },
    {
      path: '/home',
      redirect: "/home",
      component: Home, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      children: [
        {
          path: "home",
          meta: { hidden: true },
          component: Home
        }
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
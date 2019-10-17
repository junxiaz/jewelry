export default {  
  //基础信息
  path:"/BasicManage",
  name:"基础信息",
  redirect:"/BasicManage/variety",
  component : () => import('@/components/BasicManage'),
  children : [
    {
      path:"/BasicManage/variety",
      name:"品种管理",
      meta:{
        hidden:false,
        btnPermissions: ['UT00001'], //页面需要的权限
      },
      component : () => import('@/components/BasicManage/variety.vue'),
    },
    // {
    //   path:"/BasicManage/artManage",
    //   name:"工艺管理",
    //   meta:{hidden:false},
    //   component : () => import('@/components/BasicManage/artManage.vue'),
    // },
  ]
}
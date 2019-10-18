export default {
  
  //标签信息
  // {
    path:"/LabelManage",
    name:"标签信息",
    redirect:"/LabelManage/labelImport",
    component : () => import('@/components/LabelManage'),
    children : [
      {
        path:"/LabelManage/labelImport",
        name:"标签导入",
        meta:{
          hidden:false,
          btnPermissions: ['UT00001'], //页面需要的权限
        },
        component : () => import('@/components/LabelManage/labelImport.vue'),
      },
      {
        path:"/LabelManage/labelQuery",
        name:"标签查询",
        meta:{hidden:false},
        component : () => import('@/components/LabelManage/labelQuery.vue'),
      },
    ]
  // },
}
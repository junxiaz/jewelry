export default {
  
    //门店管理
    // {
      path:"/ShopManage",
      name:"门店信息",
      redirect:"/ShopManage/baseInfo",
      component : () => import('@/components/ShopManage'),
      children : [
        {
          path:"/ShopManage/baseInfo",
          name:"基本信息",
          meta:{hidden:false},
          component : () => import('@/components/ShopManage/baseInfo.vue'),
        },
        {
          path:"/ShopManage/statistics",
          name:"实时统计",
          meta:{hidden:false},
          component : () => import('@/components/ShopManage/statistics.vue'),
        },
        {
          path:"/ShopManage/inventoryInfo",
          name:"盘点信息",
          meta:{hidden:false},
          component : () => import('@/components/ShopManage/inventoryInfo.vue'),
        },
        {
          path:"/ShopManage/stock",
          name:"实时库存",
          meta:{hidden:false},
          component : () => import('@/components/ShopManage/stock.vue'),
        },
        // {
        //   path:"history",
        //   name:"历史记录",
        //   meta:{hidden:false},
        //   component : () => import('@/components/ShopManage/history.vue'),
        // },
      ]
    // },
}
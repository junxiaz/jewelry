// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui'; //引入饿了么UI
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// import axios from "axios"; //引入axios
// Vue.prototype.axios = axios;
import qs from 'qs'
Vue.prototype.qs = qs;

import 'babel-polyfill'//引入babel-polyfill,兼容ie浏览器
// import 'default-passive-events'// Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；

//因为echarts体积较大，建议按需引入
// import echarts from 'echarts'//引入图表echarts
// Vue.prototype.$echarts = echarts;
// 按需引入echarts
// //引入基本模板
// let echarts = require('echarts/lib/echarts') 
// // 引入折线图等组件
// require('echarts/lib/chart/line')
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/radar')
// // 引入提示框和title组件，图例
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例翻译滚动
// Vue.prototype.$echarts = echarts;


import "@/common/js" //引入公共的js代码，并将方法挂载到原型上
// Vue.prototype.initEasyTable = initEasyTable;
// Vue.prototype.initDate = initDate;
import has from '@/common/js/btnPermissions.js';

//获取年月日
Vue.filter('getDate',(data)=>{
  if(data){
    return data.slice(0,10);
  }
  else {
    return "";
  }
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, //vue-router
  store
  // components: { App },
  // template: '<App/>',
});

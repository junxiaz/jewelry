import Vue from 'vue';

//获取年月日
Vue.filter('getDate',(data)=>{
  if(data){
    return data.slice(0,10);
  }
  else {
    return "";
  }  
})
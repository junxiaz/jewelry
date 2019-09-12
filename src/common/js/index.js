// 公共js文件，封装通用方法，然后export暴露出来
import axios from 'axios';
import ElementUI from 'element-ui'; 

const initEasyTable = (url,params,target)=>{
  // axios.post(url,params)
  // .then(res => {
  //   target = res.data;
  //   return tableData;
  // })
  // .catch(err => {

  // })
}

const initDate = ()=>{
  return "1234256"
}

export {
  initEasyTable,
  initDate
}
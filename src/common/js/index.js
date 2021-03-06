// 公共js文件，封装通用方法，然后export暴露出来
import axios from 'axios';
import ElementUI from 'element-ui'; 

export function initTablePost({url,
  data = {},
  params = {}
}) {
  return new Promise((resolve,reject) => {
    axios({
      url,
      method:'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
         }
         return ret;         
      }],
      // 发送的数据
      data,
      // url参数
      params
    }).then(res => {
      resolve(res.data)
    })
  })
}

const initDate = ()=>{
  return "1234256"
}

export {
  initDate
}
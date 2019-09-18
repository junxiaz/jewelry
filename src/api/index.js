import ajax from './ajax'
const BASE_URL = '/web'

export const reqShopInfo = (searchData) => ajax(BASE_URL + '/shop/listShopInfo', searchData, 'POST') //
export const reqUserLogin = ({ userCode, userPwd }) => ajax(BASE_URL + '/user/webUserLogin', { userCode, userPwd }, 'POST') //登录
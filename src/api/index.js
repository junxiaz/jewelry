import ajax from './ajax'

const BASE_URL = '/web'

export const reqShopInfo = ({ token, userCode }) => ajax(BASE_URL + '/shop/listShopInfo', { token, userCode }, 'POST')
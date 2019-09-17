import ajax from './ajax'
const BASE_URL = '/web'

export const reqShopInfo = (searchData) => ajax(BASE_URL + '/shop/listShopInfo', searchData, 'POST')
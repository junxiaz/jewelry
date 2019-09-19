import ajax from './ajax'
const BASE_URL = '/web'

export const reqUserLogin = ({ userCode, userPwd }) => ajax(BASE_URL + '/user/webUserLoginp', { userCode, userPwd }, 'POST') //用户名登录
export const reqShopInfo = (searchData) => ajax(BASE_URL + '/shop/listShopInfo', searchData, 'POST') //首页门店列表
export const reqLabelInfo = (searchData) => ajax(BASE_URL + '/tag/listTagInfo', searchData, 'POST') //标签管理--标签查询列表
export const reqStatisticsInfo = (searchData) => ajax(BASE_URL + '/statistics/listHandoverStatistics', searchData, 'POST') //门店管理--统计信息
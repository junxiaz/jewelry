import {
    RECEIVE_SHOP_INFO,
} from './mutation-types'
import {
    reqShopInfo,
} from "../api";
export default {
    async getShopInfo({ commit, state }) {
        const { token, userCode } = state
        const result = await reqShopInfo({ token, userCode })
        const shopInfo = result.datas
        commit(RECEIVE_SHOP_INFO, { shopInfo })
        if (result.code) {
        }
    }
}
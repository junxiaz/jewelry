import {
    RECEIVE_USER_INFO,
} from './mutation-types'
export default {
    // 同步记录用户信息
    recordUser({ commit }, {token, userCode}) {
        commit(RECEIVE_USER_INFO, { token, userCode })
    },

    // 异步登出
    // async logout({ commit }) {
    //     const result = await reqLogout()
    //     if (result.code === 0) {
    //         commit(RESET_USER_INFO)
    //     }
    // },
}
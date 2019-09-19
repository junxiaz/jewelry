import {
    RECEIVE_USER_INFO,
    RESET_USER_INFO
} from './mutation-types'
export default {
    // 同步记录用户信息
    recordUser({ commit }, {token, userCode}) {
        commit(RECEIVE_USER_INFO, { token, userCode })
    },

    // 同步登出
    logout({ commit }) {
        commit(RESET_USER_INFO)
    },
}
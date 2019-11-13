import { 
    RECEIVE_USER_INFO, 
    RESET_USER_INFO, 
} from "./mutation-types";
export default {
    CHANGE_ACTIVE(state, payload) {
        state.activeIndex = payload;
    },
    [RECEIVE_USER_INFO](state, { token, userCode, shopCode, userTypeCode,shopName}) {
        state.token = token;
        state.userCode = userCode;
        state.userTypeCode = userTypeCode;
        state.shopCode = shopCode;
        state.shopName = shopName;
    },
    [RESET_USER_INFO](state) {
        state.token = '';
        state.userCode = '';
        state.shopCode = '';
        state.userTypeCode = '';
        state.shopName = '';
    }
}
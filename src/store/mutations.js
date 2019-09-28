import { 
    RECEIVE_USER_INFO, 
    RESET_USER_INFO, 
} from "./mutation-types";
export default {
    CHANGE_ACTIVE(state, payload) {
        state.activeIndex = payload;
    },
    [RECEIVE_USER_INFO](state, {token, userCode, shopCode}) {
        state.token = token;
        state.userCode = userCode;
        state.shopCode = shopCode;
    },
    [RESET_USER_INFO](state) {
        state.token = '';
        state.userCode = '';
        state.shopCode = '';
    }
}
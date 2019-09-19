import { 
    RECEIVE_USER_INFO, 
    RESET_USER_INFO, 
} from "./mutation-types";
export default {
    CHANGE_ACTIVE(state, payload) {
        state.activeIndex = payload;
    },
    [RECEIVE_USER_INFO](state, {token, userCode}) {
        state.token = token;
        state.userCode = userCode;
    },
    [RESET_USER_INFO](state) {
        state.token = '';
        state.userCode = '';
    }
}
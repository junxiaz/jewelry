import { 
    RECEIVE_SHOP_INFO
} from "./mutation-types";

export default {
    CHANGE_ACTIVE(state, payload) {
        state.activeIndex = payload;
    },
    [RECEIVE_SHOP_INFO] (state, {shopInfo}) {
        state.shopInfo = shopInfo
    }
}
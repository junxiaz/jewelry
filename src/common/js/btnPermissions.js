import Vue from 'vue'
import store from '@/store';

/**权限指令**/
const has = Vue.directive('has', {
    inserted: function (el, binding, vnode) {
        // 获取页面按钮权限
        let btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
        if (!Vue.prototype.$_has(btnPermissionsArr)) {
            el.parentNode.removeChild(el);
        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
    let isExist = false;
    // 获取用户按钮权限
    // let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
    let btnPermissionsStr = store.state.userTypeCode
    if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
        return false;
    }
    if (value.indexOf(btnPermissionsStr) > -1) {
        isExist = true;
    }
    return isExist;
};
export { has }
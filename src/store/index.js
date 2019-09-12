import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeIndex: window.sessionStorage.getItem("activeIndex") || 0
  },
  mutations: {
    CHANGE_ACTIVE(state,payload){
      state.activeIndex = payload;
    }
  },
  actions: {

  },
  modules: {
  }
})

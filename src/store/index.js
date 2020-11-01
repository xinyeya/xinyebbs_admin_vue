import Vue from 'vue'
import Vuex from 'vuex'
import {getStorage} from "../utils/storage";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 存储数据
  state: {
    userinfo: getStorage("userinfo") ? getStorage("userinfo") : ""
  },
  // 修改值
  mutations: {
    userinfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  // 异步修改值
  actions: {
    setUsername({ commit }, userinfo) {
      commit('userinfo', userinfo)
    },
  },
  // 获取值
  getters: {
    getUsername: state => {
      return state.userinfo
    },
  },
  modules: {

  }
});

export default store;
import Vue from "vue";
import Vuex from "vuex";

import account from "./modules/account";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    account,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});

export default store;

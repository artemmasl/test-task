import { auth } from "@/api/accountMethods";

const state = () => ({
  account: null,
});

const getters = {
  account: (state) => {
    return state.account;
  },
};

const mutations = {
  SET_ACCOUNT(state, payload) {
    state.account = payload;
  },
};

const actions = {
  async SET_ACCOUNT({ commit }, payload) {
    const account = payload || (await auth());
    commit("SET_ACCOUNT", account);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

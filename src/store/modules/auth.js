import axios from "../../services/api";

const state = {
  user: null,
  access_token: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
};

const actions = {
  async Register({ dispatch }, form) {
    await axios.post("auth/register?client=website", form);
    await dispatch("LogIn", form);
  },

  LogIn({ commit }, res) {
    commit("setUser", res.data.user);
    commit("setToken", res.data.token)
  },

  async LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  logout(state, user) {
    state.user = user;
    state.access_token = user;
  },
  setToken(state, payload) {
    state.access_token = payload
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};

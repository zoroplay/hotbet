import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import coupon from "./modules/coupon";
import createPersistedState from "vuex-persistedstate";
import VuexPersistence from "vuex-persist";
import axios from "../services/api";

Vue.use(Vuex);



const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    sports: [],
    sport_id: 1,
    fixtures: [],
    live: false,
    SportsbookBonusList: [],
    SportsbookGlobalVariable: {}
  },
  mutations: {
    setLive(state, value) {
      state.live = value;
    },
    setMenu(state, payload) {
      state.sports = payload;
    },
    setActiveSport(state, payload){
      state.sport_id = payload;
    },
    setBonusList(state, payload) {
      state.SportsbookBonusList = payload;
    },
    setGlobalVars(state, payload) {
      state.SportsbookGlobalVariable = payload;
    }
  },
  actions: {
    setCommitLive({ commit }, value) {
      commit("setLive", value);
    },
    setCommitMenu({ commit }, value) {
      commit("setMenu", value);
    },
    setCommitActiveSport({ commit }, value) {
      commit('setActiveSport', value);
    },
    setCommitSiteData({ commit }) {
      Promise.all([fetchBonusList(), fetchGlobalVars()]).then(res => {
        commit("setBonusList", res[0].data);
        commit("setGlobalVars", res[1].data);
      });
    }
  },
  modules: {
    auth,
    coupon
  },
  plugins: [createPersistedState(), vuexLocal.plugin]
});

const fetchGlobalVars = () => axios.get(`/utilities/globalvariables`);

const fetchBonusList = () => axios.get(`/utilities/bonuslist?section=onliners`);

// export const getOpenBets = () =>
//     Http.get(`user/account/open-bets`);

// export const getSettledBets = (data) =>
//     Http.post(`user/account/settled-bets`, data);

// export const getTransactions = (data) =>
//     Http.post(`user/account/get-transactions`, data);

// export const getBonusTransactions = (data, page) =>
//     Http.post(`user/account/get-bonus-transactions?page=${page}`, data);

// export const getBonuses = () =>
//     Http.get(`user/account/get-bonuses`);

// export const redeemBonus = () =>
//     Http.get(`user/account/redeem-bonus?source=mobile`);

// export const getWithdrawalInfo = () =>
//     Http.get(`user/account/withdrawal-info` );

// export function saveTransaction(res){
//     Http.post('utilities/save-payment-transaction', res).then(res => {

//     }).catch(err=>{

//     })
// }

// export const getGatewayKeys = (gateway) =>
//     Http.get(`utilities/get-gateway-keys/${gateway}`);

// export const changePassword = (data) =>
//     Http.post('user/account/change-password', data);

// export const postWithdrawal = (data) =>
//     Http.post('user/account/withdraw', data);

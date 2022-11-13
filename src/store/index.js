import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sports: [],
    sport_id: 1,
    fixtures: [],
    live: false,
  },
  mutations: {
    setLive(state, value){
      state.live = value;
      // console.log(state.live);
    }
  },
  actions: {
    setCommitLive({commit}, value){
      commit('setLive', value)
    }
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()]
});


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
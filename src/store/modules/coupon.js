import {
  calculateTotalOdds,
  calculateWinnings,
  checkBetType,
  checkIfHasLive,
  groupTournament,
  checkNoOfDraws
} from "../../mixins/coupon";
import axios from "../../services/api";


const state = {
  betPlaced: null,
  loadedCoupon: null,
  confirm: false,
  betslip: {
    acceptChanges: false,
    selections: [],
    combos: [],
    totalOdds: 1,
    maxBonus: 0,
    minBonus: 0,
    grossWin: 0,
    maxWin: 0,
    minWin: 0,
    stake: 0,
    totalStake: 0,
    minOdds: 1,
    maxOdds: 1,
    wthTax: 0,
    exciseDuty: 0,
    useBonus: false
  }
};

const getters = {
  // isAuthenticated: state => !!state.user,
  // StateUser: state => state.user
};

const actions = {
  async addToCoupon({ commit, state, rootState }, selection) {
    if (selection.odds === "-" || selection.odds === null) return false;

    commit("setBetPlaced", "");

    const data = {
      provider_id: selection.fixture.provider_id,
      event_id: selection.fixture.event_id,
      event_name: selection.fixture.event_name,
      market_id: selection.market_id,
      market_name: selection.market_name,
      oddname: selection.odd_name,
      odd_id: selection.odd_id,
      odds: selection.odds,
      element_id: selection.ele_id,
      start_date: selection.fixture.schedule,
      tournament: selection.fixture.sport_tournament_name,
      category: selection.fixture.sport_category_name,
      sport: selection.fixture.sport_name,
      type: selection.fixture_type,
      fixed: false
    };
    if (data.type === "live") {
      data.in_play_time = selection.fixture.live_data?.match_time;
      data.score = selection.fixture.score;
    }

    let couponData = { ...state.betslip };
    const globalVars = { ...rootState.SportsbookGlobalVariable };
    const bonusList = [...rootState.SportsbookBonusList];

    if (!couponData.selections.length) {
      couponData = {
        selections: [],
        combos: [],
        totalOdds: 1,
        maxBonus: 0,
        minBonus: 0,
        maxWin: 0,
        minWin: 0,
        stake: 0,
        totalStake: 0,
        minOdds: 1,
        maxOdds: 1,
        event_type: data.type,
        channel: "mobile",
        wthTax: 0,
        exciseDuty: 0
      };
      couponData.bet_type = "Single";
      couponData.selections.push(data);
      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) * parseFloat(data.odds)
      ).toFixed(2);
      //calculate and get pot winnings with bonus
      const winnings = calculateWinnings(couponData, globalVars, bonusList);
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;
      couponData.tournaments = groupTournament(couponData.selections);
      // couponData.grouped = groupSelections(
      //   couponData.selections,
      //   "provider_id"
      // );

      // check if event is live
      if (data.type === "live") couponData.hasLive = true;
      //update bets state in redux
      commit("setCouponData", couponData);
    } else {
      for (let i = 0; i < couponData.selections.length; i++) {
        //check if it's same event selected and remove it
        if (couponData.selections[i].element_id === data.element_id) {
          //remove item

          // console.log("same item");
          couponData.selections.splice(i, 1);

          couponData.totalOdds = calculateTotalOdds(couponData.selections);

          //check if couponData still has selections
          if (couponData.selections.length > 0) {
            //group selections by match
            couponData.tournaments = groupTournament(couponData.selections);
            couponData.hasLive = checkIfHasLive(couponData.selections);
            //check bet type
            couponData.bet_type = checkBetType(couponData);

            const winnings = calculateWinnings(
              couponData,
              globalVars,
              bonusList
            );
            couponData.maxWin = winnings.maxWin;
            couponData.maxBonus = winnings.maxBonus;
            couponData.wthTax = winnings.wthTax;
            couponData.grossWin = winnings.grossWin;
            // check if has live
            couponData.hasLive = checkIfHasLive(couponData.selections);
            return commit("setCouponData", couponData);
          } else {
            return commit("clearBetslip");
          }
        }
      }
      for (let i = 0; i < couponData.selections.length; i++) {
        if (couponData.selections[i].provider_id === data.provider_id) {
          //remove old selection
          couponData.selections.splice(i, 1);
          // add new selection
          couponData.selections.push(data);
          // recalculate total odds
          couponData.totalOdds = calculateTotalOdds(couponData.selections);

          //group selections by match
          couponData.tournaments = groupTournament(couponData.selections);

          //calculate and get pot winnings with bonus
          const winnings = calculateWinnings(couponData, globalVars, bonusList);
          couponData.maxWin = winnings.maxWin;
          couponData.maxBonus = winnings.maxBonus;
          // couponData.grossWin = winnings.grossWin;

          return commit("setCouponData", couponData);
        }
      }

      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) * parseFloat(data.odds)
      ).toFixed(2);
      //add selection to selections list
      couponData.selections.push(data);
      //group selections by match
      couponData.tournaments = groupTournament(couponData.selections);
      //check bet type
      couponData.bet_type = checkBetType(couponData);

      // check if event is live
      if (data.type === "live") couponData.hasLive = true;

      // couponData.combos = await getCombos(couponData);
      //calculate and get pot winnings with bonus
      const winnings = calculateWinnings(couponData, globalVars, bonusList);

      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;

      return commit("setCouponData", couponData);
    }
  },

  async removeSelection({ commit, state, rootState }, selection) {
    let couponData = { ...state.betslip };
    const globalVars = { ...rootState.SportsbookGlobalVariable };
    const bonusList = [...rootState.SportsbookBonusList];
    //find item index
    let index = couponData.selections.findIndex(
      item =>
        item.event_id === selection.event_id && item.odd_id === selection.odd_id
    );
    //remove item from list
    couponData.selections.splice(index, 1);
    //check if couponData still has selections
    if (couponData.selections.length > 0) {
      //group selections by match
      couponData.tournaments = groupTournament(couponData.selections);
      // couponData.fixtures = groupSelections(couponData.selections);
      //check bet type
      couponData.bet_type = checkBetType(couponData);

      // recalculate totalOdds if prev bet type was Split

      // else remove selection from total odds
      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) / parseFloat(selection.odds)
      ).toFixed(2);

      // check if has live
      couponData.hasLive = checkIfHasLive(couponData.selections);

      //calculate and get pot winnings with bonus
      const winnings = calculateWinnings(couponData, globalVars, bonusList);
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;
      return commit("setCouponData", couponData);
    } else {
      return commit("clearBetslip");
    }
  },

  updateWinnings({ commit, state, rootState }, stake) {
    let coupondata = { ...state.betslip };
    const globalVars = { ...rootState.SportsbookGlobalVariable };
    const bonusList = [...rootState.SportsbookBonusList];
    console.log(stake);
    coupondata.totalStake = stake;

    if (stake !== "") {
      coupondata.exciseDuty = (coupondata.totalStake * 0) / 100;
      coupondata.stake = coupondata.totalStake - coupondata.exciseDuty;
      //calculate Winnings
      let winnings = calculateWinnings(coupondata, globalVars, bonusList);
      coupondata.maxWin = winnings.maxWin;
      coupondata.maxBonus = winnings.maxBonus;
      coupondata.wthTax = winnings.wthTax;
      coupondata.grossWin = winnings.grossWin;
    }
    //set coupon data in redux
    return commit("setCouponData", coupondata);
  },

  clearBetslip({ commit }) {
    let data = {
      selections: [],
      combos: [],
      totalOdds: 1,
      minWin: 0,
      maxWin: 0,
      maxBonus: 0,
      minBonus: 0,
      stake: 0,
      totalStake: 0,
      useBonus: false
    };

    commit("cancelBet", data);
  },
  placeBet({commit, state, rootState}, e, type, giftCode) {
    // let coupondata = { ...state.betslip };
    const globalVars = { ...rootState.SportsbookGlobalVariable };
    const bonusList = [...rootState.SportsbookBonusList];

    console.log(type)
    
    commit("doLoading");
        let ele = e.target;
        // grab current state
        const coupondata = {...state.betslip};
        // add giftCode to coupondata

        if (coupondata.stake === 0){
            // commit("doLoading");
            // toast.error('Stake cannot be 0');
            return;
        }

        if (coupondata.selections.length === 2 && coupondata.stake > 2000){
          // commit("doLoading");
          toast.error('Maximum stake for 2 selections is N2,000');
            return;
        }

        const hasMoreDraws = checkNoOfDraws(coupondata.selections);

        if (hasMoreDraws) {
            toast.error(`You cannot play more than 5 draws in one ticket`);
            return;
        }

        let url;
        if (type = 'bet') {
            url = `sports/place-bet?channel=website`;
            // check if user has been self excluded
            // const {user} = {...state.auth};

            // if (user.settings?.self_exclusion_period) {
            //     toast.error(`You have been temporary locked out for the next ${calculateExclusionPeriod(user.settings?.self_exclusion_period)} days due to your responsible gaming self exclusion settings.`)
            //     return;
            // }
        } else {
            url = '/sports/book-bet?channel=website'
        }
        ele.disabled = true;
        const prevHTML = ele.innerHTML;
        ele.innerHTML = '...';

        axios.post(url, coupondata).then(res => {
            ele.disabled = false;
            // commit("doLoading");
            ele.innerHTML = prevHTML;

            // if (res.success) {
            //     if (type === 'bet') {
            //         // update user balance
            //         // dispatch({type: UPDATE_USER_BALANCE, payload: res.balance});
            //         // update todays bet
            //         // dispatch({type: SET_TODAYS_BET, payload: res.coupon});
            //         // dispatch({type: CANCEL_BET});
            //         // printTicket(res.coupon.betslip_id, 'bet')
            //     } else {
            //         ele.innerHTML = prevHTML;
            //     }
            //     return dispatch({type: SET_BET_PLACED, payload: res});
            // } else if (res.message === 'auth_fail') {
            //     return dispatch({type: SHOW_LOGIN_MODAL})
            // } else if (res.error === 'odds_change') {
            //     // let bets = this.$store.getters.bets;
            //     _.each(coupondata.selection, function (value) {
            //         _.each(res.events, function (item) {
            //             if (value.provider_id === item.provider_id && value.odd_name === item.odd_name) {
            //                 value.hasError = true;
            //             }
            //         });
            //     });
            //     toast.error('Attention! some odds have been changed');

            //     coupondata.errorMsg = 'Attention! some odds have been changed';
            //     coupondata.hasError = true;

            //     //update bets state in redux
            //     return dispatch({type: SET_COUPON_DATA, payload: coupondata});

            // } else if (res.error === 'events_started') {
            //     _.each(coupondata.selections, (value) => {
            //         _.each(res.events, (item) => {
            //             if (value.event_id === item.event_id) {
            //                 value.hasError = true
            //             }
            //         });
            //     });
            //     toast.error('Attention! Some events have started');

            //     coupondata.errorMsg = 'Attention! Some events have started';
            //     coupondata.hasError = true;
            //     coupondata.tournaments = groupTournament(coupondata.selections);
            //     // coupondata.fixtures = groupSelections(coupondata.selections);
            //     //update bets state in redux
            //     commit("setCouponData", coupondata);

            // } else if (res.error === 'events_finished') {
            //     _.each(coupondata.selections, (value) => {
            //         _.each(res.events, (item) => {
            //             if (value.event_id === item.event_id) {
            //                 value.hasError = true
            //             }
            //         });
            //     });
            //     toast.error('Attention! Some events have ended. Remove them to continue.');

            //     coupondata.errorMsg = 'Attention! Some events have ended. Remove them to continue.';
            //     coupondata.hasError = true;
            //     coupondata.tournaments = groupTournament(coupondata.selections);
            //     // coupondata.fixtures = groupSelections(coupondata.selections)
            //     // update bets state in redux
            //     commit("setCouponData", coupondata);

            // } else {
            //   commit("setLoading");
            
            //   toast.error(res.message || 'Something went wrong. We were unable to accept betslip.');
            // }
        }).catch(err => {
          commit("setLoading");

            ele.disabled = false;
            ele.innerHTML = prevHTML;

            if(err.response.status === 401){
                toast.error('Please login to place bets');
            }
            // console.log(err);
        });
  }
};

const mutations = {
  setBetPlaced(state, value) {
    state.betPlaced = value;
  },
  setCouponData(state, value) {
    state.betslip = value;
  },
  cancelBet(state, value) {
    state.betslip = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

import {
  calculateBonus,
  calculateTotalOdds,
  calculateWinnings,
  checkBetType,
  checkIfHasLive,
  groupTournament,
} from "../../mixins/coupon";
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
    useBonus: false,
  },
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
      fixed: false,
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
        exciseDuty: 0,
      };
      couponData.bet_type = "Single";
      couponData.selections.push(data);
      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) * parseFloat(data.odds)
      ).toFixed(2);
      //calculate and get pot winnings with bonus
      const winnings = calculateWinnings(
        couponData,
        globalVars,
        bonusList
      );
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;
      couponData.tournaments = groupTournament(
        couponData.selections
      );
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
            couponData.tournaments = groupTournament(
              couponData.selections
            );
            couponData.hasLive = checkIfHasLive(
                couponData.selections
            );
              //check bet type
            couponData.bet_type = checkBetType(
              couponData
            );

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
            commit("setCouponData", couponData);
          } else {
            commit("resetCoupon");
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
          couponData.totalOdds = calculateTotalOdds(
            couponData.selections
          );

          //group selections by match
          couponData.tournaments = groupTournament(
            couponData.selections
          );

          //calculate and get pot winnings with bonus
          const winnings = calculateWinnings(
            couponData,
            globalVars,
            bonusList
          );
          couponData.maxWin = winnings.maxWin;
          couponData.maxBonus = winnings.maxBonus;
          // couponData.grossWin = winnings.grossWin;

          commit("setCouponData", couponData);
        }
      }

      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) * parseFloat(data.odds)
      ).toFixed(2);
      //add selection to selections list
      couponData.selections.push(data);
      //group selections by match
      couponData.tournaments = groupTournament(
        couponData.selections
      );
      //check bet type
      couponData.bet_type = checkBetType(couponData);
      // check if event is live
      if (data.type === "live") couponData.hasLive = true;

      // couponData.combos = await getCombos(couponData);
      //calculate and get pot winnings with bonus
      const winnings = calculateWinnings(
        couponData,
        globalVars,
        bonusList
      );
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;

      commit("setCouponData", couponData);
    }
  },

  async removeSelection({ commit, state, rootState }, selection) {
    let couponData = { ...state.betslip };
    const globalVars = { ...rootState.SportsbookGlobalVariable };
    const bonusList = [...rootState.SportsbookBonusList];
    //find item index
    let index = couponData.selections.findIndex(
      (item) =>
        item.event_id === selection.event_id && item.odd_id === selection.odd_id
    );
    //remove item from list
    couponData.selections.splice(index, 1);
    //check if couponData still has selections
    if (couponData.selections.length > 0) {
      const prevBetType = couponData.bet_type;
      //group selections by match
      couponData.tournaments = groupTournament(
        couponData.selections
      );
      // couponData.fixtures = groupSelections(couponData.selections);
      //check bet type
      couponData.bet_type = checkBetType(couponData);

      if (couponData.bet_type === "Split") {
        couponData = getSplitProps(couponData);
        //calculate winnings
        const minWinnings =
          parseFloat(couponData.minOdds) * parseFloat(couponData.minStake);
        const maxWinnings =
          parseFloat(couponData.maxOdds) * parseFloat(couponData.minStake);
        //calculate bonus
        couponData.minBonus = calculateBonus(
          minWinnings,
          couponData,
          globalVars,
          bonusList
        );
        couponData.maxBonus = calculateBonus(
          maxWinnings,
          couponData,
          globalVars,
          bonusList
        );
        couponData.minGrossWin = parseFloat(couponData.minBonus) + minWinnings;
        couponData.minWTH =
          ((couponData.minGrossWin - couponData.stake) * 0) / 100;
        couponData.minWin = couponData.minGrossWin - couponData.minWTH;
        couponData.grossWin = parseFloat(couponData.maxBonus) + maxWinnings;
        couponData.wthTax =
          ((couponData.grossWin - couponData.stake) * 0) / 100;
        couponData.maxWin = couponData.grossWin - couponData.wthTax;
      } else {
        // recalculate totalOdds if prev bet type was Split
        if (prevBetType === "Split") {
          couponData.totalOdds = calculateTotalOdds(couponData.selections);
        } else {
          // else remove selection from total odds
          couponData.totalOdds = (
            parseFloat(couponData.totalOdds) / parseFloat(selection.odds)
          ).toFixed(2);
        }
        // check if has live
        couponData.hasLive = checkIfHasLive(couponData.selections);

        const calculatedGroup = couponCalculation.calcCombinations(couponData);
        couponData.combos = calculatedGroup.Groups;
        // couponData.combos = await getCombos(couponData);
        //calculate and get pot winnings with bonus
        if (couponData.bet_type === "Combo") {
          commit("setCouponData", couponData);
          if (couponData.Groupings && couponData.Groupings.length) {
            const calculatedCoupon = couponCalculation.calcPotentialWins(
              couponData,
              bonusList
            );
            couponData = couponData.updateFromCalculatedCoupon(
              couponData,
              calculatedCoupon
            );
            // update combos with max win
            couponData.combos.forEach((combo) => {
              for (let i = 0; i < couponData.Groupings.length; i++) {
                if (combo.Grouping === couponData.Groupings[i].Grouping) {
                  combo.minWIn = couponData.Groupings[i].minWin;
                  combo.maxWin = couponData.Groupings[i].maxWin;
                  combo.Stake = couponData.Groupings[i].Stake;
                }
              }
            });
            setTimeout(() => {
              return dispatch(updateComboWinningsFromTotal());
            }, 500);
          }
        } else {
          const winnings = calculateWinnings(couponData, globalVars, bonusList);
          couponData.maxWin = winnings.maxWin;
          couponData.maxBonus = winnings.maxBonus;
          couponData.wthTax = winnings.wthTax;
          couponData.grossWin = winnings.grossWin;
          commit("setCouponData", couponData);
        }
      }
    } else {
      return dispatch({ type: CANCEL_BET });
    }
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
      useBonus: false,
    };

    commit("cancelBet", data);
  },
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
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

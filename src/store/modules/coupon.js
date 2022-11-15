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
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user
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
      const winnings = this.calculateWinnings(couponData, globalVars, bonusList);
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;
      couponData.grouped = this.groupSelections(
        couponData.selections,
        "provider_id"
      );
      // check if event is live
      if (data.type === "live") couponData.hasLive = true;
      //update bets state in redux
      commit("setCouponData", couponData);
    } else {
      for (let i = 0; i < couponData.selections.length; i++) {
        //check if it's same event selected and remove it
        if (couponData.selections[i].element_id === data.element_id) {
          //remove item
          couponData.selections.splice(i, 1);
          //check if couponData still has selections
          if (couponData.selections.length > 0) {
            //group selections by match
            // couponData.grouped = groupSelections(couponData.selections, 'provider_id');
            //check bet type
            couponData.bet_type = this.checkBetType(couponData.grouped);

            const winnings = this.calculateWinnings(
              couponData,
              globalVars,
              bonusList
            );
            couponData.maxWin = winnings.maxWin;
            couponData.maxBonus = winnings.maxBonus;
            couponData.wthTax = winnings.wthTax;
            couponData.grossWin = winnings.grossWin;
            // check if has live
            couponData.hasLive = this.checkIfHasLive(couponData.selections);
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
          couponData.totalOdds = this.calculateTotalOdds(couponData.selections);
          //calculate and get pot winnings with bonus
          const winnings = this.calculateWinnings(couponData, globalVars, bonusList);
          couponData.maxWin = winnings.maxWin;
          couponData.maxBonus = winnings.maxBonus;
          couponData.grossWin = winnings.grossWin;

          commit("setCouponData", couponData);
        }
      }

      couponData.totalOdds = (
        parseFloat(couponData.totalOdds) * parseFloat(data.odds)
      ).toFixed(2);
      //add selection to selections list
      couponData.selections.push(data);
      //group selections by match
      couponData.grouped = this.groupSelections(
        couponData.selections,
        "provider_id"
      );
      //check bet type
      couponData.bet_type = this.checkBetType(couponData.grouped);
      // check if event is live
      if (data.type === "live") couponData.hasLive = true;

      // couponData.combos = await getCombos(couponData);
      //calculate and get pot winnings with bonus
      const winnings = this.calculateWinnings(couponData, globalVars, bonusList);
      couponData.maxWin = winnings.maxWin;
      couponData.maxBonus = winnings.maxBonus;
      couponData.wthTax = winnings.wthTax;
      couponData.grossWin = winnings.grossWin;

      commit("setCouponData", couponData);
    }
  }
};

const mutations = {
  setBetPlaced(state, value) {
    state.betPlaced = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

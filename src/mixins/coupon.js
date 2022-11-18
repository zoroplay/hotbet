import axios from "@/services/api";
export const groupSelections = data => {
  let ArrKeyHolder = [];
  let Arr = [];
  data.forEach(function(item) {
    ArrKeyHolder[item.provider_id] = ArrKeyHolder[item.provider_id] || {};
    let obj = ArrKeyHolder[item.provider_id];

    if (Object.keys(obj).length === 0) Arr.push(obj);

    obj.event_name = item.event_name;
    obj.event_id = item.event_id;
    obj.type = item.type;
    obj.started = item.start_date;
    obj.score = item.score;
    obj.selections = obj.selections || [];

    obj.selections.push(item);
  });
  return Arr;
};

export const groupTournament = data => {
  let ArrKeyHolder = [];
  let Arr = [];
  data.forEach(function(item) {
    ArrKeyHolder[item.tournament] = ArrKeyHolder[item.tournament] || {};
    let obj = ArrKeyHolder[item.tournament];

    if (Object.keys(obj).length === 0) Arr.push(obj);

    obj.tournamentName = item.tournament;
    obj.category = item.category;
    obj.events = obj.events || [];

    obj.events.push(item);
    obj.fixtures = groupSelections(obj.events);
  });
  return Arr;
};

export const calculateWinnings = (couponData, globalVars, bonusList) => {
  //calculate winnings
  let maxWin = 0,
    total = 0,
    maxBonus = 0,
    wthTax = 0;
  if (couponData.stake > 0)
    maxWin = parseFloat(couponData.totalOdds) * parseFloat(couponData.stake);

  console.log(maxWin);
  //calculate bonus
  if (maxWin > 0) {
    maxBonus = calculateBonus(maxWin, couponData, globalVars, bonusList);
    //add bonus to max winnings
    total = parseFloat(maxWin) + parseFloat(maxBonus);
    // calculate With-holding tax
    // wthTax =
    //   ((total - couponData.stake) * process.env.REACT_APP_WTH_PERC) / 100;
  }
  return {
    maxWin: parseFloat(total - wthTax).toFixed(2),
    grossWin: total,
    maxBonus: maxBonus,
    wthTax
  };
};

export const calculateTotalOdds = selections => {
  let totalOdds = 1;

  selections.forEach(selection => (totalOdds = totalOdds * selection.odds));

  return totalOdds;
};

export const calculateBonus = (maxWin, coupondata, globalVars, bonusList) => {
  let ticket_length = 0,
    minBonusOdd = globalVars.MinBonusOdd,
    bonusInfo = [],
    bonus = 0;
  //count eligible tickets for bonus
  coupondata.selections.forEach(item => {
    if (item.odds >= minBonusOdd) {
      ticket_length++;
    }
  });
  // console.log(minBonusOdd);
  //get bonus settings for ticket length
  bonusList.forEach(item => {
    if (item.ticket_length === ticket_length) bonusInfo = item;
  });
  //calculate total bonus
  if (bonusInfo.bonus !== undefined) {
    bonus = (maxWin * parseFloat(bonusInfo.bonus)) / 100;
  }
  return bonus;
};

export const checkBetType = coupon => {
  let betType = coupon.bet_type === "Combo" ? "Combo" : "Multiple";
  coupon.tournaments.forEach(item => {
    item.fixtures.forEach(fixture => {
      if (fixture.selections.length > 1) {
        betType = "Split";
        return false;
      }
    });
  });
  return betType;
};

export const getSplitProps = async couponData => {
  const res = await axios.post("/sports/get-split-props", {
    selections: couponData.selections
  });
  couponData.noOfCombos = res.noOfCombos;
  couponData.minOdds = res.minOdds;
  couponData.maxOdds = res.maxOdds;
  couponData.maxBonus = res.maxBonus;
  couponData.minWin = res.minWin;
  couponData.maxWin = res.maxWin;
  return couponData;
};

export const checkIfHasLive = selections => {
  let hasLive = false;
  selections.forEach(item => {
    if (item.type === "live") {
      hasLive = true;
    }
  });
  return hasLive;
};

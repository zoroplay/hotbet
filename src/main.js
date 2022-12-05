import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from "moment";
import axios from '@/services/api'

import InfiniteLoading from 'vue-infinite-loading'
Vue.component('infinite-loading', InfiniteLoading)

Vue.use(moment);
Vue.use(BootstrapVue)

const eventBus = new Vue(); 
Vue.prototype.eventBus = eventBus;

Vue.mixin({
  methods:{
    formatDate(date){
      return moment(date).format('ddd DD/MM')
    },
    formatBalance(number){
      const n = number ? number : 0;
      return "KSH " + parseFloat(n).toLocaleString();
    },
    reloadPage(){
      window.location.reload();
    },
    getSportsMenu(){
      axios.get('sports/get-menu?period=all&start=null&end=null').then((res)=>{
        this.$store.dispatch('setCommitMenu', res.data.menu)
      })
    },
    setActiveSport(e){
      this.$store.dispatch('setCommitActiveSport', e.target.value);
    },
    liveScore(score, team) {
      if (score) {
        const scoreArray = score.split(':');
        if(team === 'home') {
            return "0" + scoreArray[0];
        } else {
            return "0" + scoreArray[1];
        }
      }
    },
    groupSelections(data) {
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
    },
    calculateWinnings(couponData, globalVars, bonusList) {
      //calculate winnings
      let maxWin =
        parseFloat(couponData.totalOdds) * parseFloat(couponData.stake);
      //calculate bonus
      let maxBonus = this.calculateBonus(
        maxWin,
        couponData,
        globalVars,
        bonusList
      );
      //add bonus to max winnings
      let total = parseFloat(maxWin) + parseFloat(maxBonus);
      // calculate With-holding tax
      let wthTax =
        ((total - couponData.stake) * process.env.REACT_APP_WTH_PERC) / 100;

      return {
        maxWin: parseFloat(total - wthTax).toFixed(2),
        grossWin: total,
        maxBonus: maxBonus,
        wthTax
      };
    },
    calculateTotalOdds(selections) {
      let totalOdds = 1;

      selections.forEach(selection => (totalOdds = totalOdds * selection.odds));

      return totalOdds;
    },
    calculateBonus(maxWin, coupondata, globalVars, bonusList) {
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
    },
    checkBetType(grouped) {
      let betType = "Multiple";
      grouped.forEach(item => {
        if (item.selections.length > 1) {
          betType = "Split";
          return false;
        }
      });
      return betType;
    },

    createID(event_id, market_id, odd_name, odd_id) {
      let oddname = String(odd_name).replace(/[^a-zA-Z0-9]/g, "_");
      return event_id + "_" + market_id + "_" + oddname + "_" + odd_id;
    }
  },
  created(){
    eventBus.$on('change_sports', (id) => {
      this.dispatch('setCommitActiveSport', id)
    })
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

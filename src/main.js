import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap";
import Toast, { POSITION } from "vue-toastification";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastification/dist/index.css";

import moment from "moment";
import axios from "@/services/api";

import InfiniteLoading from "vue-infinite-loading";

Vue.component("infinite-loading", InfiniteLoading);

Vue.use(moment);
Vue.use(BootstrapVue);
Vue.use(Toast, { position: POSITION.TOP_CENTER });
const eventBus = new Vue();
Vue.prototype.eventBus = eventBus;

Vue.mixin({
  methods: {
    formatDate(date) {
      return moment(date).format("ddd DD/MM");
    },
    formatBalance(number) {
      const n = number ? number : 0;
      return "KSH " + parseFloat(n).toLocaleString();
    },
    formatNumber(number) {
      return !number
        ? 0
        : parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
    },
    reloadPage() {
      window.location.reload();
    },
    getSportsMenu() {
      axios.get("sports/get-menu?period=all&start=null&end=null").then(res => {
        this.$store.dispatch("setCommitMenu", res.data.menu);
      });
    },
    setActiveSport(e) {
      this.$store.dispatch("setCommitActiveSport", e.target.value);
    },
    liveScore(score, team) {
      if (score) {
        const scoreArray = score.split(":");
        if (team === "home") {
          return "0" + scoreArray[0];
        } else {
          return "0" + scoreArray[1];
        }
      }
    },
    isSelected(ele_id, coupon) {
      let isExist = false;

      if (coupon.selections.length > 0) {
        let count = coupon.selections.find(
          selection => selection.element_id === ele_id
        );
        if (count) {
          isExist = true;
        }
      }
      return isExist;
    },
    createID(event_id, market_id, odd_name, odd_id) {
      let oddname = String(odd_name).replace(/[^a-zA-Z0-9]/g, "_");
      return event_id + "_" + market_id + "_" + oddname + "_" + odd_id;
    }
  },
  created() {
    eventBus.$on("change_sports", id => {
      this.dispatch("setCommitActiveSport", id);
    });
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

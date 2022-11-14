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

Vue.mixin({
  methods:{
    formatDate(date){
      return moment(date).format('ddd DD/MM')
    },
    formatBalance(number){
      const n = number ? number : 0;
      return "" + parseFloat(n).toLocaleString();
    },
    reloadPage(){
      window.location.reload();
    },
    getSportsMenu(){
      axios.get('sports/get-menu?period=all&start=null&end=null').then((res)=>{
        this.$store.dispatch('setCommitMenu', res.data.menu)
      })
    }
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

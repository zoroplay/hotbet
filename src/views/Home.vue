<template>
  <div class="center-body">
    <div class="center-content" v-if="!error && !loading">
      <div class="top-image">
        <img src="@/assets/banner.png" class="img-fluid" alt="">
      </div>
      <div class="container-lg mt-3">
        <div class="card page-headline" v-if="user && user.balance < 100">
          <div class="card-body text-start">
            <h4>Deposit Funds</h4>
            <p class="mb-0">Your balance is low. Deposit Now</p>
          </div>
        </div>
      </div>
      <mobile-mini></mobile-mini>
      
      <!-- Live -->
      <live :limit="3"></live>
      <!-- <live-fixtures></live-fixtures> -->
      <div class="text-center my-3 d-none">
        <router-link to="/Live" class="text-white text-decoration-none btn btn-secondary btn-sm rounded-50">More Live Now <i class="bi bi-arrow-right"></i></router-link>
      </div>
      <!-- Live -->
      <div class="p-3 d-flex justify-content-start align-items">
        <button class="btn rounded-0 btn-outline-secondary active btn-sm me-2 rounded-pill px-4">All</button>
        <button class="btn rounded-0 btn-outline-secondary btn-sm me-2 rounded-pill px-4">1hr</button>
        <button class="btn rounded-0 btn-outline-secondary btn-sm me-2 rounded-pill px-4">3hr</button>
        <button class="btn rounded-0 btn-outline-secondary btn-sm me-2 rounded-pill px-4">24hr</button>
        <button class="btn rounded-0 btn-outline-secondary btn-sm me-2 rounded-pill px-4">72hr</button>
      </div>
      <div class="center-game_list">
        <div class="card bg-transparent border-0 rounded-0">
          <div class="card-header rounded-0 text-start page_headline py-3">
            <h1>Highlights</h1>
          </div>
          
          <fixtures :fixtures="fixtures" v-if="!loading && fixtures.length" :predictions="predictions" />
          <infinite-loading v-if="fixtures.length" spinner="spiral" @infinite="infiniteScroll"></infinite-loading>
        </div>
      </div>
    </div>
    <div v-if="!fixtures.length" class="loading mt-5 text-center">
        <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
      </div>
    <div class="card bg-transparent rounded-0 border-0 py-5 my-5" v-if="error">
          <h5>{{ error }}</h5>
          <p>You had a connection issue. Pleasae try again</p>
          <div class="col-md-6 mx-auto text-center">
              <button @click="reloadPage" class="btn btn-sm btn-secondary rounded-0">Reload Page</button>
          </div>
      </div>
  </div>
</template>

<script>
import Fixtures from '../components/Fixtures.vue';
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/services/api"
import MobileMini from '../components/mobile-mini.vue';
// import LiveFixtures from '../components/LiveFixtures.vue';
import Live from './Live.vue';
export default {
  components: { Fixtures, MobileMini, Live },
  name: "Home",
  data(){
    return {
      fixtures: [],
      predictions: [],
      page: 1,
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
      error: null
    }
  },
  watch: {
      $route: {
          immediate: true,
          handler(to) {
              // react to route changes...
              document.title = 'Capital Bet';
          },
      },
  },
  computed: {
    url() {
      let today = new Date();
      let future = new Date();
      let sport_id = this.$store.state.sport_id;
      future.setDate(today.getDate() + 7)
      let start = today.getFullYear() + "-" + (today.getMonth()+1)   + "-"  + today.getDate();
      let end = future.getFullYear() + "-" + (future.getMonth()+1)   + "-"  + future.getDate();
      return `sports/get-fixtures-by-date?date=${start}&end_date=${end}&sid=${sport_id}&channel=mobile&limit=15&page=${this.page}`;
    },

    isLoggedIn: function() {
        return this.$store.getters.isAuthenticated;
    },
    user: function () {
        return this.$store.state.auth.user;
    }
  },
  methods:{
    async getHighlights() {
      const resp = await axios.get(this.url)
      this.fixtures = resp.data.fixtures.data;
      this.predictions = resp.data.predictions;
      // console.log(this.fixtures)
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page = this.page + 1; // next page
        axios.get(this.url).then(resp => {
            if (resp.data.fixtures.data.length > 1) { // check if any left
              resp.data.fixtures.data.forEach(
                item => this.fixtures.push(item)
              ); // push it into the items array so we can display the data
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.error = err.message
          });
      }, 500);
    },
    filterEvents(duration){
      if(duration == '1hr'){
        filter((x) => x.sport_id == sport_id );
      }
    }
  }, 
  created(){
    this.getHighlights()
  },
  beforeCreate(){
    console.log(this.$store.state.live)
    this.$store.dispatch('setCommitLive', false);
  },
  beforeDestroy(){

  }
};
</script>

<style>
.top-image{
  padding: 0px;
}
.page_headline h1{
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 800;

}
</style>

<template>
  <div class="center-body">
    <div class="center-content">
      <div class="center-game_list" v-if="!loading">
        <div class="card bg-transparent border-0 rounded-0" v-if="!error && !loading">
          <div class="card-header rounded-0 text-start page_headline py-3">
            <h1> <i class="bi bi-activity"></i> Live</h1>
          </div>
          
          <!-- <fixtures
            :fixtures="games"
            :live="live"
            v-if="!loading && fixtures.length"
          ></fixtures> -->
          <live-fixtures :fixtures="games.slice(0,limit)" v-if="!loading && fixtures.length && limit"></live-fixtures>
          <live-fixtures :fixtures="games" v-if="!loading && fixtures.length && !limit"></live-fixtures>
          <div
            v-if="!loading && !games.length"
            class="loading mt-5 text-center"
          >
            <p>No Live games. Check back later</p>
          </div>
        </div>
        <div class="card bg-transparent rounded-0 border-0 py-5 my-5" v-if="error">
            <h5>{{ error }}</h5>
            <p>You had a connection issue. Pleasae try again</p>
            <div class="col-md-6 mx-auto text-center">
                <button @click="reloadPage" class="btn btn-sm btn-secondary rounded-0">Reload Page</button>
            </div>
        </div>
      </div>
      <div v-if="loading" class="loading mt-5 py-5 text-center">
        <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script>
// import Fixtures from "../components/Fixtures.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/services/api";
import LiveFixtures from '../components/LiveFixtures.vue';
export default {
  components: { LiveFixtures },
  name: "Live",
  props: ["limit"],
  data() {
    return {
      fixtures: [],
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
      error: null
    };
  },
  computed: {
    games() {
      let sport_id = this.$store.state.sport_id;
      return this.fixtures.filter((x) => x.sport_id == sport_id );
    },
  },
  methods: {
    getLive() {
      this.loading = true;
      axios.get("sports/live").then((res) => {
        this.loading = false;
        this.fixtures = res.data.data.fixtures;
      }).catch(error =>{
        this.loading = false;
        this.error = error.message
      })
    },
    // sort: function(arr) {
    //   let odds = arr.live_data.markets;
    //   return odds.slice().sort(function(a, b) {
    //     return a.id - b.id;
    //   });
    // },
  },
  mounted() {
    this.getLive();
    // console.log(this.sort(this.oddx));
    console.log(this.games)
  },
  beforeCreate() {
    // console.log(this.$store.state.live)
    this.$store.dispatch("setCommitLive", true);
    console.log(this.$store.state.live);
  },
  beforeDestroy() {
    this.$store.dispatch("setCommitLive", false);
  },
};
</script>

<style>
.top-image {
  padding: 0px;
}

.page_headline h1 {
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 800;
}
</style>

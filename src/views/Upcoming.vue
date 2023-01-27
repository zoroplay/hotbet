<template>
  <div class="center-body">
    <div class="center-content">
      <div class="top-image border-bottom">
        <img src="@/assets/banner.png" class="img-fluid" alt="" />
      </div>
      <div class="center-game_list">
        <div class="card bg-transparent border-0 rounded-0 rounded-0">
          <div class="card-header text-start page_headline py-3">
            <h1>Upcoming</h1>
          </div>
          <div v-if="loading" class="loading mt-5 text-center">
            <img
              src="@/assets/loading.gif"
              style="height: 40px"
              alt=""
              srcset=""
            />
          </div>
          <fixtures
            :fixtures="fixtures"
            v-if="!loading && fixtures.length"
            :predictions="predictions"
          />
          <infinite-loading
            v-if="fixtures.length"
            spinner="spiral"
            @infinite="infiniteScroll"
          ></infinite-loading>
        </div>
      </div>
    </div>
    <div v-if="!fixtures.length && loading" class="loading mt-5 text-center">
      <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="" />
    </div>
    <div class="card bg-transparent rounded-0 border-0 py-5 my-5" v-if="error">
      <h5>{{ error }}</h5>
      <p>You had a connection issue. Pleasae try again</p>
      <div class="col-md-6 mx-auto text-center">
        <button @click="reloadPage" class="btn btn-sm btn-secondary rounded-0">
          Reload Page
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Fixtures from "../components/Fixtures.vue";
import moment from "moment";

// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/services/api";
export default {
  components: { Fixtures },
  name: "Home",
  data() {
    return {
      fixtures: [],
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
      sport_id: this.$store.state.sport_id,
      error: null
    };
  },
  computed: {
    url() {
      let sport_id = this.$store.state.sport_id;
      let start = moment().format("YYYY-MM-DD HH:mm");
      let end = moment()
        .add(7, "days")
        .format("YYYY-MM-DD HH:mm");
      return `sports/get-fixtures-by-date?date=${start}&end_date=${end}&sid=${sport_id}&channel=mobile&limit=15&page=${this.page}`;
    }
  },
  methods: {
    async getUpcoming() {
      const resp = await axios.get(this.url);
      this.fixtures = resp.data.fixtures.data;
      this.predictions = resp.data.predictions;
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page = this.page + 1; // next page
        axios
          .get(this.url)
          .then(resp => {
            if (resp.data.fixtures.data.length > 1) {
              // check if any left
              resp.data.fixtures.data.forEach(item => this.fixtures.push(item)); // push it into the items array so we can display the data
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.error = err.message;
          });
      }, 500);
    }
  },
  created() {
    this.getUpcoming();
  },
  beforeCreate() {
    console.log(this.$store.state.live);
    this.$store.dispatch("setCommitLive", false);
  },
  beforeDestroy() {}
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

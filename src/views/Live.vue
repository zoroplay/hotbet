<template>
  <div class="center-body">
    <div class="center-content">
      <div class="center-game_list">
        <div class="card bg-transparent border-0 rounded-0">
          <div class="card-header rounded-0 text-start page_headline py-3">
            <h1> <i class="bi bi-activity"></i> Live</h1>
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
            :fixtures="games.slice(0,limit)"
            :live="live"
            v-if="!loading && fixtures.length"
          ></fixtures>
          <div
            v-if="!loading && !games.length"
            class="loading mt-5 text-center"
          >
            <p>No Live games. Check back later</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fixtures from "../components/Fixtures.vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/services/api";
export default {
  components: { Fixtures },
  name: "Home",
  props: ["limit"],
  data() {
    return {
      fixtures: [],
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
      oddx: [
        {
          active: "1",
          changed: "true",
          name: "Total",
          id: "7",
          type_id: "5",
          type: "to",
          specialOddsValue: "3.5",
          odds: [
            { active: "1", type: "o", odds: "3.50" },
            { active: "1", type: "u", odds: "1.28" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Total",
          id: "8",
          type_id: "5",
          type: "to",
          specialOddsValue: "0.5",
          odds: [
            { active: "0", type: "o", odds: "1.03" },
            { active: "0", type: "u", odds: "15.00" },
          ],
        },
        {
          active: "1",
          changed: "true",
          name: "Total",
          id: "6",
          type_id: "5",
          type: "to",
          specialOddsValue: "1.5",
          odds: [
            { active: "1", type: "o", odds: "1.18" },
            { active: "1", type: "u", odds: "4.50" },
          ],
        },
        {
          active: "1",
          changed: "true",
          name: "Total",
          id: "4",
          type_id: "5",
          type: "to",
          specialOddsValue: "2.5",
          odds: [
            { active: "1", type: "o", odds: "1.80" },
            { active: "1", type: "u", odds: "1.90" },
          ],
        },
        {
          active: "1",
          changed: "true",
          name: "Total",
          id: "5",
          type_id: "5",
          type: "to",
          specialOddsValue: "4.5",
          odds: [
            { active: "1", type: "o", odds: "8.00" },
            { active: "1", type: "u", odds: "1.08" },
          ],
        },
        {
          active: "1",
          changed: "true",
          name: "Total",
          id: "9",
          type_id: "5",
          type: "to",
          specialOddsValue: "5.5",
          odds: [
            { active: "1", type: "o", odds: "19.00" },
            { active: "1", type: "u", odds: "1.02" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Total",
          id: "10",
          type_id: "5",
          type: "to",
          specialOddsValue: "6.5",
          odds: [
            { active: "0", type: "o", odds: "26.00" },
            { active: "0", type: "u", odds: "1.01" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Total",
          id: "11",
          type_id: "5",
          type: "to",
          specialOddsValue: "7.5",
          odds: [
            { active: "0", type: "o", odds: "26.00" },
            { active: "0", type: "u", odds: "1.01" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Halftime - Total",
          id: "47",
          type_id: "7",
          type: "ft2w",
          specialOddsValue: "0.5",
          odds: [
            { active: "0", type: "1", odds: "2.75" },
            { active: "0", type: "2", odds: "1.40" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Halftime - Total",
          id: "46",
          type_id: "7",
          type: "ft2w",
          specialOddsValue: "1.5",
          odds: [
            { active: "0", type: "1", odds: "1.11" },
            { active: "0", type: "2", odds: "6.50" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Halftime - Total",
          id: "44",
          type_id: "7",
          type: "ft2w",
          specialOddsValue: "2.5",
          odds: [
            { active: "0", type: "1", odds: "1.01" },
            { active: "0", type: "2", odds: "23.00" },
          ],
        },
        
        {
          active: "0",
          changed: "true",
          name: "Total hometeam",
          id: "15421",
          type_id: "8",
          type: "ftnw",
          specialOddsValue: "0.5",
          odds: [
            { active: "0", type: "under", odds: "10.00" },
            { active: "0", type: "over", odds: "1.06" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Total awayteam",
          id: "15422",
          type_id: "8",
          type: "ftnw",
          specialOddsValue: "0.5",
          odds: [
            { active: "0", type: "under", odds: "1.80" },
            { active: "0", type: "over", odds: "1.90" },
          ],
        },
        {
          active: "0",
          changed: "true",
          name: "Halftime - Double chance (1X - 12 - X2)",
          id: "16838",
          type_id: "8",
          type: "ftnw",
          specialOddsValue: "-1",
          odds: [
            { active: "0", type: "1X", odds: "0.95" },
            { active: "0", type: "12", odds: "0.99" },
            { active: "0", type: "X2", odds: "19.04" },
          ],
        }
      ],
      // limit: limit
    };
  },
  computed: {
    games() {
      let sport_id = this.$store.state.sport_id;
      return this.fixtures.filter((x) => x.sport_id == sport_id);
    },
  },
  methods: {
    getLive() {
      this.loading = true;
      axios.get("sports/live").then((res) => {
        this.loading = false;
        this.fixtures = res.data.data.fixtures;
      });
    },
    sort: function(arr) {
      let odds = arr.live_data.markets;
      return odds.slice().sort(function(a, b) {
        return a.id - b.id;
      });
    },
  },
  mounted() {
    this.getLive();
    // console.log(this.sort(this.oddx));
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

<template>
  <div>
    <div class="center-body">
      <div class="center-content">
        <div class="center-game_list betlist">
          <div class="card bg-transparent rounded-0 border-0 rounded-0">
            <div class="card-header text-start py-2">
              <h3>Bet History</h3>
            </div>
            <div class="card-header text-start page_headline py-3">
              <router-link
                to="/bets/open"
                class="text-decoration-none me-3 text-white fw-bolder"
                >Open</router-link
              >
              <router-link
                to="/bets/settled"
                class="text-decoration-none me-3 text-white fw-bolder"
                >Settled</router-link
              >
              <router-link
                to="/bets/jackpots"
                class="text-decoration-none me-3 jackpots fw-bolder"
                >Jackpots</router-link
              >
              <router-link
                to="/bets/virtuals"
                class="text-decoration-none me-3 text-white fw-bolder"
                >Virtuals</router-link
              >
            </div>
            <div class="card-body text-start"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
export default {
  data() {
    return {
      event_id: "",
      details: [],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        // react to route changes...
        document.title = to.params.name.replace(/[^a-z0-9+]+/gi, " ");
        this.event_id = to.params.event_id; //this.baseConverter(to.params.game_id, 36, 10);
        this.live = to.params.status === "live";
        this.getMatch();
      },
    },
  },
  methods: {
    getMatch() {
      this.loading = true;
      if (this.live) {
        this.$store.dispatch("setCommitLive", true);
        axios.get(`/sports/live/${this.event_id}/en`).then((res) => {
          this.details = res.data.data;
          var live_data = JSON.parse(res.data.data.live_data);
          this.details.live_data = live_data;
          console.log("====");
          console.log(this.details);
        });
      } else {
        axios
          .get(`/sports/get-fixture/${this.event_id}`)
          .then((res) => {
            var fixture = res.data.data;
            if (fixture.live_data) {
              this.$store.dispatch("setCommitLive", false);
            }
            this.details = res.data.data;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.betlist .jackpots.router-link-exact-active.router-link-active {
  color: #ee3135;
  font-weight: 800;
}
</style>

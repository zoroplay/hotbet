<template>
  <div>
    <div class="center-body">
      <div class="center-content">
        <div class="center-game_list betlist">
          <div
            class="card bg-transparent rounded-0 border-0 rounded-0"
            v-if="!loading && !error"
          >
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
                class="text-decoration-none me-3 settled fw-bolder"
                >Settled</router-link
              >
              <router-link
                to="/bets/jackpots"
                class="text-decoration-none me-3 text-white fw-bolder"
                >Jackpots</router-link
              >
              <router-link
                to="/bets/virtuals"
                class="text-decoration-none me-3 text-white fw-bolder"
                >Virtuals</router-link
              >
            </div>
            <div v-if="details.length">
              <div
                class="card-body text-start item"
                v-for="(bet, index) in details"
                :key="index"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>2:04pm <b>Sat 12/11</b></h6>
                    <span class="text-muted">ID: #{{ bet.betslip_id }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <small class="text-muted text-capitalize fw-bold"
                      >stake</small
                    >
                    <p class="mb-0">{{ formatBalance(bet.stake) }}</p>
                  </div>
                  <div class="col-4">
                    <small class="text-muted text-capitalize fw-bold"
                      >odds</small
                    >
                    <p class="mb-0">{{ bet.odds }}</p>
                  </div>
                  <div class="col-4 text-end">
                    <small class="text-muted text-capitalize fw-bold"
                      >Pot win</small
                    >
                    <p class="mb-0">{{ formatBalance(bet.pot_winnings) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              <p class="text-white">No data available</p>
            </div>
          </div>
          <div
            class="card bg-transparent rounded-0 border-0 py-5 my-5"
            v-if="error"
          >
            <h5>{{ error }}</h5>
            <p>You had a connection issue. Please try again</p>
            <div class="col-md-6 mx-auto text-center">
              <button
                @click="reloadPage"
                class="btn btn-sm btn-secondary rounded-0"
              >
                Reload Page
              </button>
            </div>
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
      details: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    getBetlist() {
      this.loading = true;
      axios
        .post("user/account/settled-bets")
        .then((res) => {
          this.details = res.data.bets.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
  mounted() {
    this.getBetlist();
  },
};
</script>

<style>
.betlist .settled.router-link-exact-active.router-link-active {
  color: #ee3135;
  font-weight: 800;
}
</style>

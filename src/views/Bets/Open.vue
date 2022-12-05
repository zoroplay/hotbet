<template>
  <div>
    <div class="center-body" v-if="!loading">
      <div class="center-content">
        <div class="center-game_list betlist">
          <div
            class="card bg-transparent rounded-0 border-0 rounded-0"
            v-if="!error && !loading"
          >
            <div class="card-header text-start py-2">
              <h3>Bet History</h3>
            </div>
            <div class="card-header text-start page_headline py-3">
              <router-link
                to="/bets/open"
                class="open text-decoration-none me-3 fw-bolder"
                >Open</router-link
              >
              <router-link
                to="/bets/settled"
                class="text-decoration-none me-3 text-white fw-bolder"
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
            <div
              class="card-body text-start item"
              v-for="(bet, index) in details"
              :key="index"
            >
              <router-link
                :to="{ name: 'bet-info', params: { id: bet.betslip_id } }"
                class="text-dark text-decoration-none"
                style="text-decoration: none;"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 class="text-white">{{ formatDate(bet.created_at) }}</h6>
                    <span class="text-muted">ID: {{ bet.betslip_id }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <small class="text-muted text-capitalize fw-bold"
                      >stake</small
                    >
                    <p class="mb-0 text-white">
                      {{ formatBalance(bet.stake) }}
                    </p>
                  </div>
                  <div class="col-4">
                    <small class="text-muted text-capitalize fw-bold"
                      >odds</small
                    >
                    <p class="mb-0 text-white">{{ bet.odds }}</p>
                  </div>
                  <div class="col-4 text-end">
                    <small class="text-muted text-capitalize fw-bold"
                      >Payout</small
                    >
                    <p class="mb-0 text-white">
                      {{ formatBalance(bet.pot_winnings) }}
                    </p>
                  </div>
                </div>
              </router-link>
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
    <div v-if="loading" class="loading mt-5 text-center">
      <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
import moment from "moment";
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
        .get("user/account/open-bets")
        .then((res) => {
          this.details = res.data.bets;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
          // console.log(err);
        });
    },
    formatDate(date) {
      return moment(date).format("h:mma ddd DD/MM");
    },
  },
  mounted() {
    this.getBetlist();
  },
};
</script>

<style>
.betlist .open.router-link-exact-active.router-link-active {
  color: #ee3135;
  font-weight: 800;
}

.betlist .item {
  border-bottom: 1px solid rgba(235, 238, 241, 0.125);
}
</style>

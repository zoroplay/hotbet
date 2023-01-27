<template>
  <b-sidebar
    id="betslip-menu"
    sidebar-class="overflow-hidden"
    backdrop
    no-header
    shadow
    right
  >
    <div class="right-content">
      <div class="balance p-2 text-start page-headline">
        <div
          v-if="!$store.state.auth.user"
          class="text-white d-flex justify-content-between align-items-center"
        >
          <p class="mb-0 fw-bolder">BETSLIP</p>
          <div>
            <span class="me-1">
              <router-link to="/Register" class="text-white"
                >Join Now</router-link
              >
              or
              <router-link class="text-white" to="/Login">Log In</router-link>
            </span>
            <button
              v-b-toggle.betslip-menu
              class="ms-3 btn btn-link text-decoration-none text-white p-0"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div
          class="text-white d-flex justify-content-between align-items-center"
          v-else
        >
          <p class="mb-0 fw-bolder">BETSLIP</p>
          <div>
            <span
              >Balance <b>{{ formatBalance(user.balance) }}</b></span
            >
            <button
              v-b-toggle.betslip-menu
              class="btn pe-1 btn-link text-white text-decoration-none"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="right-bet_container">
        <div
          class="nav nav-tabs nav-justified border-0"
          id="nav-tab"
          role="tablist"
        >
          <button
            class="nav-link active py-3 border-0 rounded-0"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Sport ({{ betslip.selections.length }})
          </button>
          <button
            class="nav-link rounded-0 py-3 border-0"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Virtual (0)
          </button>
        </div>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane show active py-3"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div class="px-3" v-if="betslip.selections.length < 1">
              <div class="d-flex">
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="inputPassword2"
                  placeholder=""
                />
                <button class="btn bg-dark rounded-0 text-white">load</button>
              </div>
              <p>Betslip is empty</p>
              <svg class="svg-icon" style="vertical-align: middle;">
                <!---->
                <use
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="/img/icons.c4f70481.svg#empty-betslip"
                ></use>
              </svg>
            </div>
            <div v-else>
              <div>
                <div
                  class=" d-flex mb-3 justify-content-between align-items-center"
                >
                  <span class="text-underline btn btn-link text-white"
                    >Booking Code</span
                  >
                  <span
                    class="text-underline btn btn-link text-white"
                    @click.prevent="clearBetslip"
                    >Clear Betslip</span
                  >
                </div>
                <div
                  v-for="(bet, index) in betslip.selections"
                  :key="index"
                  class="card rounded-0 page-headline border-0"
                >
                  <div class="text-start card-body p-0">
                    <div class="d-flex align-items-center betslip-bet">
                      <div
                        class="delete_bet h-100 px-3 py-4"
                        @click="removeSelection(bet)"
                      >
                        <i class="bi bi-x-lg"></i>
                      </div>
                      <div class="btslip-game px-3 w-100">
                        <div class="d-flex justify-content-between">
                          <span>{{ bet.market_name }} - {{ bet.oddname }}</span>
                          <span>{{ bet.odds }}</span>
                        </div>
                        <router-link
                          :to="{
                            name: 'match',
                            params: {
                              event_id:
                                bet.provider_id === undefined
                                  ? 0
                                  : bet.provider_id,
                              name: toURL(bet.event_name),
                              status: 'prematch',
                            },
                          }"
                          class="small text-white"
                          >{{ bet.event_name }}</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-start py-3 px-2">
                  <div class="ps-0 form-check mb-3">
                    <input
                      class="me-3"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label text-white"
                      for="flexCheckDefault"
                    >
                      Accept odd changes
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="fw-bolder text-white-50" for="">Stake</label>
                    <input
                      type="number"
                      @keyup="updateWinnings($event)"
                      :value="betslip.totalStake"
                      class="form-control rounded-0 bg-transparent text-white"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                    <small id="helpId" class="text-muted">Min stake is 100</small>
                  </div>
                  <div
                    class="d-flex text-white justify-content-between align-items-center"
                  >
                    <span>Odds</span>
                    <span class="fw-bolder">{{ betslip.totalOdds }}</span>
                  </div>
                  <div
                    v-if="betslip.maxBonus > 0"
                    class="d-flex text-white justify-content-between align-items-center"
                  >
                    <span>Bonus</span>
                    <span class="fw-bolder">{{
                      formatNumber(betslip.maxBonus)
                    }}</span>
                  </div>
                  <div
                    v-if="betslip.maxWin > 0"
                    class="d-flex text-white justify-content-between align-items-center"
                  >
                    <span>Pot. Winnings</span>
                    <span class="fw-bolder">{{
                      formatNumber(betslip.maxWin)
                    }}</span>
                  </div>
                  <div class="col-12 py-2">
                    <button class="btn btn-sm w-100 rounded-0 btn-success" @click="placeBet">
                      PLACE BET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <p>Betslip is empty</p>
            <svg
              data-v-0739479d=""
              data-v-848acb24=""
              class="svg-icon"
              style="vertical-align: middle;"
            >
              <!---->
              <use
                data-v-0739479d=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="/img/icons.c4f70481.svg#empty-betslip"
              ></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: "betslip-menu",
  data() {
    return {
      user: this.$store.state.auth.user,
      loading: false
    };
  },
  computed: {
    betslip() {
      return this.$store.state.coupon.betslip;
    }
  },
  methods: {
    toURL(name) {
      if (name === undefined) {
        return "-";
      }
      return name.replace(/[^a-z0-9+]+/gi, "-");
    },
    removeSelection(selection) {
      this.$store.dispatch("removeSelection", selection);
    },
    clearBetslip() {
      this.$store.dispatch("clearBetslip");
    },
    updateWinnings(e) {
      const val = e.target.value;
      this.$store.dispatch("updateWinnings", val);
    },
    placeBet(e){
      this.$store.dispatch('placeBet', {e, type: "bet"})
    }
  },
  //   props: ,
};
</script>

<style>
.b-sidebar#betslip-menu.bg-light {
  background-color: #16202c !important;
  width: 100% !important;
}

.b-sidebar .page-headline {
  background-color: #1c1e24;
  color: #fff;
  border-radius: 0;
}

.right-content {
  height: calc(100vh - 73px);
  border-left: 1px solid rgba(235, 238, 241, 0.125);
}

.right-bet_container > .nav-tabs > .nav-link {
  color: #fff;
  font-weight: 900;
  background-color: transparent;
}

.right-bet_container > .nav-tabs > .nav-link.active {
  background-color: #23313d;
  color: #fff !important;
}

.balance {
  border-bottom: 0.5px solid rgba(235, 238, 241, 0.125);
}

.betslip-bet .delete_bet {
  background-color: #1c1e24;
}

.betslip-bet {
  border-bottom: 0.5px solid rgba(235, 238, 241, 0.125);
}

/* .betslip-bet:last-child{
    border-bottom: 0;
} */
</style>

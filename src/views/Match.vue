<template>
  <div>
    <div class="center-body">
      <div class="center-content">
        <div class="center-game_list" v-if="!loading && details">
          <div class="card bg-transparent rounded-0 border-0 rounded-0">
            <div
              class="card-header page_headline py-3"
              :class="live ? 'text-center' : 'text-start'"
            >
              <div
                v-if="live"
                class="justify-content-center score d-flex align-items-center text-warning"
              >
                {{ liveScore(details?.score, "home") }}
                <span class="time"
                  >{{
                    details.live_data?.match_time !== 0 &&
                      details.live_data?.match_time
                  }}<span className="timeFlash">'</span></span
                >
                {{ liveScore(details?.score, "away") }}
              </div>
              <div
                v-if="!live"
                class="d-flex justify-content-start fixture_time_date"
              >
                <span class="pe-2">{{ details.event_time }} </span>
                <span class="fw-bold">
                  {{ formatDate(details.event_date) }}</span
                >
              </div>
              <div class="d-flex flex-column">
                <h3 class="team" :class="live ? 'text-center' : ''">
                  {{ details.team_a }} - {{ details.team_b }}
                </h3>
                <div
                  class="sport_tournament text-muted"
                  :class="live ? 'text-center' : ''"
                >
                  <p class="mb-0">
                    {{ details.sport_tournament_name }} -
                    {{ details.sport_category_name }} - {{ details.sport_name }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="card-body text-start"
              v-for="(i, o) in details.markets"
              :key="o"
            >
              <h6 class="fw-bolder">{{ i.market_name }}</h6>
              <div>
                <div
                  class="bets"
                  :class="i.selections.length % 2 === 0 ? 'bets-2' : 'bets-3'"
                >
                  <div
                    class="bet"
                    :class="
                      isSelected(
                        createID(
                          details.provider_id,
                          i.market_id,
                          x.name,
                          x.id
                        ),
                        betslip
                      )
                        ? 'selected'
                        : ''
                    "
                    v-for="(x, y) in i.selections"
                    :key="y"
                  >
                    <div class="anchor-wrap column" @click="add(i, x)">
                      <span class="event_selection text-capitalize">
                        {{ x.name }}
                      </span>
                      <span class="event_odds">
                        {{ x.odds }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!live">
              <div v-for="(market, o) in details.markets" :key="o">
                <div class="card-body text-start" v-if="market.status">
                  <h6 class="fw-bolder">{{ market.market_name }}</h6>
                  <div>
                    <div
                      class="bets"
                      :class="
                        market.selections.length % 2 === 0 ? 'bets-2' : 'bets-3'
                      "
                    >
                      <div
                        class="bet"
                        :class="
                          isSelected(
                            createID(
                              details.provider_id,
                              market.market_id,
                              outcome.name,
                              outcome.id
                            ),
                            betslip
                          )
                            ? 'selected'
                            : ''
                        "
                        v-for="(outcome, y) in market.selections"
                        :key="y"
                      >
                        <div
                          class="anchor-wrap column"
                          @click="add(market, outcome)"
                        >
                          <span
                            class="event_selection"
                            v-if="outcome.active == '1'"
                          >
                            {{ outcome.name }}
                          </span>
                          <span class="event_odds" v-if="outcome.active == '1'">
                            {{ outcome.odds }}
                          </span>
                          <span class="event_odds" v-if="outcome.active == '0'">
                            <i class="bi bi-lock text-white-50"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="live">
              <div v-for="(i, o) in sort(details.live_data?.markets)" :key="o">
                <div class="card-body text-start" v-if="i.active == '1'">
                  <h6 class="fw-bolder">
                    {{ i.name }}
                    <span v-if="i.type_id == '5'"
                      >O/U {{ i.specialOddsValue }}</span
                    >
                  </h6>
                  <div>
                    <div
                      class="bets"
                      :class="i.odds.length % 2 === 0 ? 'bets-2' : 'bets-3'"
                    >
                      <div class="bet" v-for="(x, y) in i.odds" :key="y">
                        <div class="anchor-wrap column">
                          <span
                            class="event_selection text-uppercase"
                            v-if="x.active == '1'"
                          >
                            {{ x.type }}
                          </span>
                          <span class="event_odds" v-if="x.active == '1'">
                            {{ x.odds }}
                          </span>
                          <span class="event_odds" v-if="x.active == '0'">
                            <i class="bi bi-lock text-white-50"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-if="loading" class="loading mt-5 text-center">
                        <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
                    </div>
                    <fixtures :fixtures="fixtures" v-if="!loading && fixtures.length"></fixtures> -->
          </div>
        </div>
        <div v-if="loading" class="loading mt-5 text-center">
          <img
            src="@/assets/loading.gif"
            style="height: 40px"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
export default {
  name: "match",
  data() {
    return {
      event_id: "",
      details: {},
      loading: false
    };
  },
  computed: {
    betslip() {
      return this.$store.state.coupon.betslip;
    }
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
      }
    }
  },
  methods: {
    getMatch() {
      this.loading = true;
      if (this.live) {
        this.$store.dispatch("setCommitLive", true);
        axios.get(`/sports/live/${this.event_id}/en`).then(res => {
          this.details = res.data.data;
          var live_data = JSON.parse(res.data.data.live_data);
          this.details.live_data = live_data;
          this.loading = false;
          console.log("====");
          console.log(this.details);
        });
      } else {
        axios
          .get(`/sports/get-fixture/${this.event_id}`)
          .then(res => {
            var fixture = res.data.data;
            if (fixture.live_data) {
              this.$store.dispatch("setCommitLive", false);
            }
            this.details = res.data.data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      }
    },
    add(market, outcome) {
      const data = {
        fixture: this.details,
        market_id: market.market_id,
        market_name: market.market_name,
        odds: outcome.odds,
        odd_id: outcome.id,
        odd_name: outcome.name,
        ele_id: this.createID(
          this.details.provider_id,
          market.market_id,
          outcome.name,
          outcome.id
        ),
        fixture_type: this.details.fixture_type
      };
      this.$store.dispatch("addToCoupon", data);
    },
    formatScore(score) {
      if (parseInt(score) < 10) {
        return "0" + score;
      } else {
        return score;
      }
    },
    sort: function(arr) {
      return arr.slice().sort(function(a, b) {
        return a.id - b.id;
      });
    }
  }
};
</script>

<style>
.bet .anchor-wrap.column {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.bets.bets-2 .bet {
  -webkit-box-flex: 1;
  -webkit-flex: 1 calc(50% - 8px);
  flex: 1 calc(50% - 8px);
  max-width: 50%;
}

@media (max-width: 220px) {
  .bets.bets-2 .bet {
    -webkit-box-flex: 1;
    -webkit-flex: 1 100%;
    flex: 1 100%;
    max-width: none;
  }
}

.bets.bets-3 .bet {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  width: calc(33.33333% - 8px);
}

.score {
  font-size: 30px;
  font-weight: 800;
}

.score span.time {
  font-weight: 400;
  font-size: 13px;
  padding: 1px 15px;
  margin: 0 15px;
  background-color: #1c1e24;
}

.time span.timeFlash {
  animation: blinker 1s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>

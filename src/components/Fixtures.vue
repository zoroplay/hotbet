<template>
  <div class="fixture">
    <div
      class="card-body text-start "
      v-for="(fixture, index) in fixtures"
      :key="index"
    >
      <div
        class="text-dark text-decoration-none"
        style="text-decoration: none;"
      >
        <div class="d-flex justify-content-start fixture_time_date">
          <span class="pe-2 text-white-50">{{ fixture.event_time }} </span>
          <span class="fw-bold text-white-50">
            {{ formatDate(fixture.event_date) }}</span
          >
        </div>
        <router-link
          :to="{
            name: 'match',
            params: {
              event_id:
                fixture.provider_id === undefined ? 0 : fixture.provider_id,
              name: toURL(fixture.event_name),
              status: live ? 'live' : 'prematch'
            }
          }"
         class="d-flex flex-column"
         style="text-decoration: none"
        >
          <div class="d-flex justify-content-between">
            <span class="team text-white">{{ fixture.team_a }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span class="team text-white">{{ fixture.team_b }}</span>
          </div>
          <div class="sport_tournament text-muted">
            <span>{{ fixture.sport_name }}</span
            >/ <span> {{ fixture.sport_tournament_name }} </span>
          </div>
        </router-link>

        <div class="bets">
          <odds
            v-for="(o, index) in fixture.odds"
            :key="index"
            :outcome="o"
            :status="o.active"
            :fixture="fixture"
            :predictions="predictions"
          />
          <div class="bets-markets">
            <a class="text-decoration-none">+{{ fixture.markets_count }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Odds from "./Odds.vue";
import moment from "moment";
export default {
  components: { Odds },
  props: ["fixtures", "live", "predictions"],
  methods: {
    toURL(name) {
      if (name === undefined) {
        return "-";
      }
      return name.replace(/[^a-z0-9+]+/gi, "-");
    },
    formatDate(date) {
      return moment(date).format("ddd DD/MM");
    },
    getHomeScore(score) {
      return score;
    },
    getAwayScore(score) {
      return score;
    },

    sort: function(arr) {
      // let odds = arr.live_data.markets;
      return arr.slice().sort(function(a, b) {
        return a.id - b.id;
      });
    },
    sortFixture(fixture) {
      console.log(this.sort(fixture.live_data.markets).slice(0, 1));
      return this.sort(fixture.live_data.markets).slice(0, 1);
    }
  }
};
</script>

<style>
.fixture > .card-body {
  border-bottom: 0.5px solid rgba(235, 238, 241, 0.125);
}
.team {
  font-size: 18px;
  font-weight: 700;
}
.sport_tournament {
  font-size: 12px;
}

.fixture_time_date {
  font-size: 14px;
}

.bets {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: stretch;
  -webkit-justify-content: stretch;
  justify-content: stretch;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  /* padding: 0 5px 0 13px; */
  font-size: 14px;
  line-height: 14px;
  text-align: center;
}

.bet {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-right: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  color: #fff;
  padding: 10px;
}

/* .bet:last-of-type{
    margin-right: 0;
} */

.bet .event_selection {
  border-radius: 0;
  font-size: 14px;
  line-height: 13px;
  font-weight: 400;
}

.bet .event_odds {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  font-weight: 700;
  border-radius: 0;
  white-space: nowrap;
  padding: 10px;
}

.bets-markets a {
  font-weight: bolder;
  background: 0 0;
  border-radius: 0;
  color: #fff;
  white-space: nowrap;
  background-color: #23313d;

  padding: 9px 6px;
  min-width: 46px;
  text-align: center;
  display: block;
  font-size: 14px;
  line-height: 16px;
}

/* .bets-markets a:hover  {
    background: #252a2d;
    color: #fff;
    border: 1px solid #252a2d;
} */

.score {
  font-weight: 800;
  font-size: 22px;
}
</style>

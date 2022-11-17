<template>
  <!-- <div class="bets"> -->
  <div class="bet" @click="addToBetslip">
    <span class="event_selection" v-if="status == '1'">
      {{ outcome.name }}
    </span>
    <span class="event_odds" v-if="status == '1'">
      {{ outcome.odds }}
    </span>
    <span class="event_odds" v-if="status == '0'">
      <i class="bi bi-lock text-white-50"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "odds",
  props: ["outcome", "status", "live", "fixture", "predictions"],
  methods: {
    createID(event_id, market_id, odd_name, odd_id) {
      let oddname = String(odd_name).replace(/[^a-zA-Z0-9]/g, "_");
      return event_id + "_" + market_id + "_" + oddname + "_" + odd_id;
    },
    addToBetslip() {
      const data = {
        fixture: this.fixture,
        market_id: this.predictions[0].market_id,
        market_name: this.predictions[0].market_name,
        odds: this.outcome.odds,
        odd_id: this.outcome.id,
        odd_name: this.outcome.name,
        ele_id: this.createID(
          this.fixture.provider_id,
          this.predictions[0].market_id,
          this.outcome.name,
          this.outcome.id
        ),
        fixture_type: this.fixture.fixture_type
      };
      this.$store.dispatch("addToCoupon", data);
    }
  }
};
</script>

<style>
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
  /* border: 1px solid #bdc3c7; */
  cursor: pointer;
  background-color: #23313d;
  color: #fff;
  padding: 10px;
}

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
</style>

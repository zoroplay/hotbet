<template>
  <!-- <div class="bets"> -->
  <div
    class="bet"
    :class="
      isSelected(
        createID(
          fixture.provider_id,
          outcome[0].id,
          name,
          type
        ),
        betslip
      )
        ? 'selected'
        : ''
    "
    @click="addToBetslip"
  >
    <span class="event_selection text-uppercase" v-if="status == '1'">
      {{ name }}
    </span>
    <span class="event_odds" v-if="status == '1'">
      {{ odds }}
    </span>
    <span class="event_odds" v-if="status == '0'">
      <i class="bi bi-lock text-white-50"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "live-odds",
  props: ["odds","type", "name", "status", "fixture", "outcome"],
  computed: {
    betslip() {
      return this.$store.state.coupon.betslip;
    }
  },
  methods: {
    addToBetslip() {
      const data = {
        fixture: this.fixture,
        market_id: this.outcome[0].id,
        market_name: this.outcome[0].name,
        odds: this.odds,
        odd_id: this.outcome.id,
        odd_name: this.name,
        ele_id: this.createID(
          this.fixture.provider_id,
          this.outcome[0].id,
          this.name,
          this.type
        ),
        fixture_type: this.fixture.fixture_type,
      };
      this.$store.dispatch("addToCoupon", data);
    },
  },
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

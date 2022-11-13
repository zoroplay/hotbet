<template>
  <!-- <div class="bets"> -->
      <div class="bet">
        <span class="event_selection" v-if="status == '1'">
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
    name: "odds",
    props: ['odds', 'name', 'status', "live"]
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

<template>
  <div
    class="col-md-3 d-none d-lg-block pe-0 position-absolute top-0 bottom-0 start-0 overflow-auto left"
  >
    <div class="left-content">
      <div class="left-top py-2 px-3 border-bottom">
        <div class="mb-1">
          <select @change="setActiveSport($event)" class="form-select rounded-0" name="" id="">
            <option selected>Select one</option>
            <option :value="sport.sport_id" v-for="(sport, index) in sports" :key="index">{{
              sport.name
            }}</option>
          </select>
        </div>
      </div>
      <div class="left-middle border-bottom">
        <ul class="list-group list-group-flush rounded-0 text-start">
          <router-link to="/" class="list-group-item"
            ><i class="bi bi-house-door"></i> Home</router-link
          >
          <router-link to="/Live" class="list-group-item">
            <i class="bi bi-activity"></i> Live Now</router-link
          >
          <router-link to="/Upcoming" class="list-group-item"
            ><i class="bi bi-calendar-event"></i> Upcoming</router-link
          >
          <!-- <router-link class="list-group-item"><i class="bi bi-calendar-event-fill"></i> Today</a> -->
          <router-link to="/Virtual" class="list-group-item"
            >Virtual</router-link
          >
          <router-link to="/Casino" class="list-group-item">Casino</router-link>
        </ul>
      </div>
      <div class="left-bottom">
        <div
          class="accordion accordion-flush rounded-0"
          id="accordionFlushExample"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed fw-bold text-uppercase"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Tournaments
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body p-0">
                <ul class="list-group list-group-flush rounded-0 text-start">
                  <li
                    v-for="(tournament, index) in tournaments"
                    :key="index"
                    class="list-group-item"
                  >
                    {{ tournament.tournament.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button
                class="accordion-button collapsed fw-bold text-uppercase"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Sports
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body p-0">
                <ul class="list-group list-group-flush rounded-0 text-start">
                  <li
                    v-for="(sport, index) in sports[0].categories"
                    :key="index"
                    class="list-group-item"
                  >
                    {{ sport.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "left-side",
  props: ["tournaments"],
  computed: {
    sports() {
      return this.$store.state.sports;
    },
  },
  created() {
    this.getSportsMenu();
  },
};
</script>

<style scoped>
.left {
  width: 22% !important;
  /* z-index: ; */
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .left {
    width: 21% !important;
    /* z-index: ; */
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .left {
    width: 22% !important;
    /* z-index: ; */
  }
}

.left-content {
  height: calc(100vh - 73px);
  border-right: 1px solid rgba(235, 238, 241, 0.125);
  /* position: absolute;
        overflow: hidden;
        left: 0; */
}
.list-group .list-group-item {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: transparent;
  border-color: rgba(235, 238, 241, 0.125);
  color: #fff;
}

.list-group .list-group-item i {
  display: none;
}

.list-group .list-group-item.router-link-exact-active.router-link-active {
  /* background-colo/r: white; */
  border-color: rgba(235, 238, 241, 0.125);
  border-left: 6px solid #ee3135;
  color: #ee3135;
  font-weight: 800;
}

.list-group .list-group-item.router-link-exact-active.router-link-active i {
  display: inline;
  color: #ee3135;
}

.accordion.accordion-flush .accordion-item .accordion-button {
  background-color: #16202c;
  color: white;
}
.accordion,
.accordion-body {
  border-color: rgba(235, 238, 241, 0.125);
  background-color: #16202c;
}
</style>

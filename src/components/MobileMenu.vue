<template>
  <b-sidebar
    id="sidebar-1"
    sidebar-class="overflow-hidden"
    backdrop
    no-header
    title="Sidebar"
    shadow
  >
    <div class="py-2">
      <div class="left-content">
        <div class="left-top py-2 px-3 d-flex  align-items-center border-bottom">
          <div class="mb-1 w-100">
            <select class="form-select rounded-0" name="" id="">
              <option selected>Select one</option>
              <option value="" v-for="(sport, index) in sports" :key="index">{{
                sport.name
              }}</option>
            </select>
          </div>
          <button v-b-toggle.sidebar-1 class="ms-3 btn btn-link text-decoration-none text-white p-0"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="left-middle">
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
            <router-link to="/Casino" class="list-group-item"
              >Casino</router-link
            >
          </ul>
        </div>
        <div class="left-bottom">
          <div
            class="accordion accordion-flush border-0"
            id="accordionFlushExample"
          >
            <div
              class="accordion-item"
              style="border-bottom: 1px solid rgba(235, 238, 241,.125) !important; backgorund-color: #16202c !important"
            >
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed fw-bold text-uppercase border-0"
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
                <div class="accordion-body px-1">
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
                  class="accordion-button collapsed fw-bold text-uppercase border-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Popular Countries
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body px-1">
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
            <!-- <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed fw-bold text-uppercase" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                Other Countries
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to
                                demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion
                                body. Nothing more exciting happening here in terms of content, but just filling up the
                                space to make it look, at least at first glance, a bit more representative of how this
                                would look in a real-world application.</div>
                        </div>
                    </div> -->
          </div>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: "mobile-nav",
  props: ["tournaments", "sports"],
};
</script>

<style>
/* .left-content{
    border-right: none !important;
} */

.b-sidebar#sidebar-1.bg-light {
  background-color: #16202c !important;
  width: 100% !important;
  padding-top: 67px;
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

.accordion.accordion-item:first-of-type {
  border-bottom-color: rgba(235, 238, 241, 0.125) !important;
}

.accordion.accordion-flush .accordion-item .accordion-button {
  background-color: #16202c;
  color: white;
}
.accordion,
.accordion-body,
.accordion-item {
  border-color: rgba(235, 238, 241, 0.125) !important;
  background-color: #16202c !important;
}
</style>

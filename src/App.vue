<template>
  <div id="app">
    <div class="header">
      <navbar :sports="sports" :tournaments="tournaments"></navbar>
    </div>
    <div class="view-wrapper">
      <div class="view-content">
        <div class="row position-relative">
          <left-side :tournaments="tournaments"></left-side>
          <div class="col px-sm-0 px-1 center overflow-auto">
            <router-view />
          </div>
          <right-side></right-side>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
import Navbar from "./components/Navbar.vue";
import LeftSide from "./components/LeftSide.vue";
import RightSide from "./components/RightSide.vue";

export default {
  components: { Navbar, LeftSide, RightSide },
  name: "app",
  data() {
    return {
      tournaments: [],
    };
  },
  computed: {
    sports() {
      return this.$store.state.sports;
    },
  },
  methods: {
    getTournaments() {
      axios.get("/sports/topbets").then((res) => {
        this.tournaments = res.data.topbets;
      });
    },
  },
  mounted() {
    this.getTournaments();
    this.$store.dispatch("setCommitSiteData");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #16202c;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
}

.view-wrapper > .view-content > .row {
  overflow: hidden;
  height: calc(100vh - 73px);
}

.center {
  width: calc(100% - 53%);
  margin: 0 30% 0 22%;
  overflow-y: auto;
  height: calc(100vh - 73px);
}

@media screen and (max-width: 600px) {
  .center {
    width: 100%;
    margin: 0;
    overflow: auto;
    height: calc(100vh - 73px);
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .center {
    width: 100%;
    margin: 0;
    overflow: auto;
    height: calc(100vh - 73px);
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .center {
    width: 100%;
    margin: 0;
    overflow: auto;
    height: calc(100vh - 73px);
  }
}
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .center {
    width: calc(100% - 49%);
    margin: 0 28% 0 21%;
    overflow-y: auto;
    height: calc(100vh - 73px);
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .center {
    width: calc(100% - 53%);
    margin: 0 30% 0 22%;
    overflow-y: auto;
    height: calc(100vh - 73px);
  }
}
.card-header.page_headline {
  background-color: #23313d;
  color: #fff;
  border-radius: 0;
}

.txt-primary {
  color: #ee3135;
}

.bg-prim {
  background-color: #ee3135;
  color: white;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

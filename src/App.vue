<template>
  <div id="app">
    <menu-top :sports="sports" :tournaments="tournaments"></menu-top>
    <navbar :sports="sports" :tournaments="tournaments"></navbar>
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
    <betslip-footer :betslip="selections"></betslip-footer>
  </div>
</template>

<script>
import axios from "@/services/api";
import Navbar from "./components/Navbar.vue";
import LeftSide from "./components/LeftSide.vue";
import RightSide from "./components/RightSide.vue";
import BetslipFooter from './components/BetslipFooter.vue';
import MenuTop from './components/MenuTop.vue';

export default {
  components: { Navbar, LeftSide, RightSide, BetslipFooter, MenuTop },
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
    selections(){
      return this.$store.state.coupon.betslip;
    }
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
  background-color: #082b5b;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  .header {
    background: #0E1E35;
    flex-wrap: nowrap;
    border-bottom: 1px solid #095387;
    margin-bottom: 5px;
  }
  .list-group {
    .list-group-item {
      background: #0e1e35;
      border-bottom: 1px solid #0e1e35;
      border-top: 1px solid #0f5298;
    }
  }
  .accordion-header {
    .accordion-button {
      background: #095387;
      background-image: linear-gradient(to bottom, #095387 3%,#030f1f 4%, #082b5b 5%, #042361 50%, #082b5b 95%,#030f1f 96%, #008822 97%);
      border-bottom: 2px solid #050F1F;
    }
  }
  .btn-success {
    background: #037c1f;
    color: #f0f0f0;
    border-color: #71931c;
  }
}

.Vue-Toastification__toast {
  min-height: auto !important;
  padding: 10px 24px !important;
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

@media screen and (max-width: 360px) {
  html, body, h1,h2, h3, h4,h5,h6,p,span{
    font-size: 5vw !important;
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

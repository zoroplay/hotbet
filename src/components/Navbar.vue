<template>
  <div class="header">
    <div
      class="main d-flex justify-content-between align-items-center px-3 py-3 bg-transparent"
      style="z-index: 99999;"
    >
      <router-link to="/" class="navbar-brand">
        <img :src="siteLogo" class="img-fluid logo" alt="" />
      </router-link>
      <div class="input-group d-none w-30">
        <input
          type="text"
          class="form-control border-0"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <span
          class="input-group-text rounded-0 bg-white border-0"
          id="basic-addon2"
          ><i class="bi bi-search"></i
        ></span>
      </div>
      <!-- <span v-if="isLoggedIn">
                <router-link @click="logout">Logout</router-link>
                </span> -->
      <div
        v-if="!isLoggedIn"
        class="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <router-link
          to="/Login"
          class="btn bg-transparent text-white text-uppercase fw-bold"
          >LOGIN</router-link
        >
        <router-link
          to="/Register"
          class="btn btn-success align-items-center btn-sm text-uppercase fw-bold"
          >join now</router-link
        >
        <div class="dropdown d-none d-lg-block d-md-block">
          <button
            type="button"
            class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-fill"></i> menu
          </button>
          <ul
            class="dropdown-menu shadow"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <router-link class="dropdown-item" to="/Register"
                >Join Now</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="/Login"
                >Log In</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="/Deposit"
                >Deposit</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" to="#">Help</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="isLoggedIn"
        class="d-flex flex-row align-items-center"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          class="btn btn-sm disabled border-0 bg-transparent text-white text-uppercase fw-bold"
        >
          {{ formatBalance(user.balance) }}
        </button>
        <router-link to="/Deposit">
          <button class="btn rounded-0 btn-success btn-sm fw-bold">
            DEPOSIT
          </button>
        </router-link>
        <div class="dropdown d-none d-lg-block">
          <button
            type="button"
            class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-fill"></i> menu
          </button>
          <ul
            class="dropdown-menu shadow rounded-0"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <router-link
                class="dropdown-item py-2 border-bottom"
                to="/Messages"
              >
                <i class="bi bi-envelope"></i> Messages</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item py-2 border-bottom" to="/bets"
                ><img
                  src="@/assets/img/mybets_black.png"
                  style="height: 20px"
                  alt=""
                  srcset=""
                />
                My Bets</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item py-2 border-bottom"
                to="/deposit"
              >
                <i class="bi bi-box-arrow-in-down-left"></i>
                Deposit</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item py-2 border-bottom"
                to="/transactions"
                ><i class="bi bi-list-ul"></i> Transactions</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item py-2 border-bottom"
                to="/withdraw"
                ><i class="bi bi-box-arrow-up-right"></i> Withdraw</router-link
              >
            </li>
            <li>
              <router-link
                class="dropdown-item py-2 border-bottom"
                to="/account"
              >
                <i class="bi bi-lock"></i> Change Password</router-link
              >
            </li>
            <li>
              <a class="dropdown-item" style="cursor: pointer" @click="logout"
                ><i class="bi bi-power"></i> Log Out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <mobile-menu :tournaments="tournaments" :sports="sports"></mobile-menu>
    <betslip-menu></betslip-menu>
  </div>
</template>

<script>
import BetslipMenu from "./BetslipMenu.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  components: { MobileMenu, BetslipMenu },
  props: ["tournaments", "sports"],
  data() {
    return {};
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
    user: function() {
      return this.$store.state.auth.user;
    },
    betslip: function() {
      return this.$store.state.coupon.betslip;
    },
    siteLogo: function() {
      return this.$store.state.SportsbookGlobalVariable.logo;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.logo {
  height: 30px !important;
}
.w-30 {
  width: 30% !important;
}

.btn {
  padding: 8px 12px;
}
.header,
.header .mobile-head {
  border-bottom: 0.5px solid rgba(235, 238, 241, 0.125);
}

.dropdown-toggle::after {
  display: none !important;
}

.dropdown-menu {
  width: 230px;
  border-radius: 0;
}
@media screen and (max-width: 360px) {
  .logo {
    height: 19px !important;
  }
}
</style>

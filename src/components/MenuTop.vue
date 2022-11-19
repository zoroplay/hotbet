<template>
    <div class="header">
        <div class="d-lg-none mobile-head main py-3 bg-transparent">
            <div class="d-flex justify-content-between align-items-center bg-transaparent">
                <div class="d-flex px-3">
                    <div class="d-flex align-items-center me-3">
                        <button v-b-toggle.sidebar-1 class="text-white px-0 navbar-toggler d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <i class="bi bi-list"></i>
                            <small class="fw-bolder">SPORTS</small>
                        </button>
                        
                    </div>
                    <router-link class="me-3 fw-bolder small text-white text-decoration-none" to="/Virtual">VIRTUAL</router-link>
                    <router-link class="me-3 fw-bolder small text-white text-decoration-none" to="/Casino">CASINO</router-link>
                </div>
                <div class="d-flex align-items-center justify-content-end px-2">
                    <div v-if="isLoggedIn" class="dropdown d-lg-none">
                        <button type="button" class="btn d-lg-none bg-transparent dropdown-toggle py-0 text-white text-uppercase fw-bold small border-0" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                        <ul class="dropdown-menu rounded-0 shadow" aria-labelledby="dropdownMenuButton1">
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/Messages"> <i class="bi bi-envelope"></i> Messages</router-link></li>
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/bets"><img src="@/assets/img/mybets_black.png" style="height: 20px" alt="" srcset=""> My Bets</router-link></li>
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/deposit"> <i class="bi bi-box-arrow-in-down-left"></i> Deposit</router-link></li>
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/transactions"><i class="bi bi-list-ul"></i> Transactions</router-link></li>
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/withdraw"><i class="bi bi-box-arrow-up-right"></i> Withdraw</router-link></li>
                            <li><router-link class="dropdown-item py-2 border-bottom" to="/account"> <i class="bi bi-lock"></i> Change Password</router-link></li>
                            <li><a class="dropdown-item" style="cursor: pointer" @click="logout"><i class="bi bi-power"></i> Log Out</a></li>
                        </ul>
                    </div>
                    <div v-if="!isLoggedIn" class="btn-group" role="group" aria-label="Basic example">
                        <div class="dropdown">
                            <button type="button" class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                            <ul class="dropdown-menu rounded-0 shadow" aria-labelledby="dropdownMenuButton1">
                                <li><router-link class="dropdown-item" to="/Regsiter">Join Now</router-link></li>
                                <li><router-link class="dropdown-item" to="/Login">Log In</router-link></li>
                                <li><router-link class="dropdown-item" to="/Login">Deposit</router-link></li>
                                <li><router-link class="dropdown-item" to="#">Help</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <button v-b-toggle.betslip-menu class="btn rounded-0 p-1 bg-warning rounded-5"> <img src="@/assets/img/mybets_black.png" style="height: 20px" alt="" srcset="">{{betslip.selections.length}}</button>
                </div>
            </div>
        </div>
        <betslip-menu></betslip-menu>
    </div>
</template>

<script>
import BetslipMenu from './BetslipMenu.vue';
// import MobileMenu from './MobileMenu.vue';
export default {
    components: {BetslipMenu},
    props: ['tournaments','sports'],
    data(){
        return {}
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
        user: function () {
            return this.$store.state.auth.user;
        },
        betslip: function(){
            return this.$store.state.coupon.betslip;
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch("LogOut");
            this.$router.push("/login");
        },
    },
};
</script>

<style>
    .w-30{
        width: 30% !important;
    }

    .btn{
        padding: 8px 12px;
    }
    .header, .header .mobile-head{
        border-bottom: 0.5px solid rgba(235, 238, 241,.125);
    }

    .dropdown-toggle::after{
        display: none !important;
    }

    .dropdown-menu{
        width: 230px;
        border-radius: 0;
    }
</style>
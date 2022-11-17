<template>
    <div class="header">
        <div class="d-lg-none mobile-head main py-3 bg-transparent">
            <div class="d-flex justify-content-between align-items-center bg-transaparent">
                <div class="d-flex px-3">
                    <div class="d-flex align-items-center me-3">
                        <button v-b-toggle.sidebar-1 class="text-white px-0 navbar-toggler d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                            <i class="bi bi-list"></i>
                        </button>
                        <small class="fw-bolder">SPORTS</small>
                    </div>
                    <router-link class="me-3 fw-bolder small text-white text-decoration-none" to="/Virtual">VIRTUAL</router-link>
                    <router-link class="me-3 fw-bolder small text-white text-decoration-none" to="/Casino">CASINO</router-link>
                </div>
                <div v-if="isLoggedIn" class="dropdown d-lg-none">
                    <button type="button" class="btn d-lg-none bg-transparent dropdown-toggle py-0 text-white text-uppercase fw-bold small border-0" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/Messages">Messages</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/bets">My Bets</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/deposit">Deposit</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/transactions">Transactions</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/withdraw">Withdraw</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/account">Change Password</router-link></li>
                        <li><a class="dropdown-item" style="cursor: pointer" @click="logout">Log Out</a></li>
                    </ul>
                </div>
                <div v-if="!isLoggedIn" class="btn-group" role="group" aria-label="Basic example">
                    <div class="dropdown">
                        <button type="button" class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><router-link class="dropdown-item" to="#">Join Now</router-link></li>
                            <li><router-link class="dropdown-item" to="#">Log In</router-link></li>
                            <li><router-link class="dropdown-item" to="#">Deposit</router-link></li>
                            <li><router-link class="dropdown-item" to="#">Help</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="main d-flex justify-content-between align-items-center px-3 py-3 bg-transparent">
            <router-link to="/" class="navbar-brand">
                <img src="@/assets/logo1.png" class="img-fluid" style="height: 30px" alt="" />
            </router-link>
            <div class="input-group d-none w-30">
                <input type="text" class="form-control border-0" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span class="input-group-text rounded-0 bg-white border-0" id="basic-addon2"><i class="bi bi-search"></i></span>
            </div> 
                <!-- <span v-if="isLoggedIn">
                <router-link @click="logout">Logout</router-link>
                </span> -->
            <div v-if="!isLoggedIn" class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn bg-transparent text-white text-uppercase fw-bold">LOGIN</button>
                <button type="button" class="btn btn-success btn-sm text-uppercase fw-bold">join now</button>
                <div class="dropdown d-none d-lg-block d-md-block">
                    <button type="button" class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><router-link class="dropdown-item" to="#">Join Now {{isLoggedIn}}</router-link></li>
                        <li><router-link class="dropdown-item" to="#">Log In</router-link></li>
                        <li><router-link class="dropdown-item" to="#">Deposit</router-link></li>
                        <li><router-link class="dropdown-item" to="#">Help</router-link></li>
                    </ul>
                </div>
            </div>
            <div v-if="isLoggedIn" class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm disabled border-0 bg-transparent text-white text-uppercase fw-bold">{{ formatBalance(user.balance) }}</button>
                <router-link to="/Deposit" type="button" class="btn btn-success btn-sm text-uppercase fw-bold">DEPOSIT</router-link>
                <div class="dropdown d-none d-lg-block">
                    <button type="button" class="btn bg-transparent dropdown-toggle text-white text-uppercase fw-bold" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-fill"></i> menu</button>
                    <ul class="dropdown-menu rounded-0" aria-labelledby="dropdownMenuButton1">
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/Messages">Messages</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/bets">My Bets</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/deposit">Deposit</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/transactions">Transactions</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/withdraw">Withdraw</router-link></li>
                        <li><router-link class="dropdown-item py-2 border-bottom" to="/account">Change Password</router-link></li>
                        <li><a class="dropdown-item" style="cursor: pointer" @click="logout">Log Out</a></li>
                    </ul>
                </div>
                
            </div>
        </div>
        
        <mobile-menu :tournaments="tournaments" :sports="sports"></mobile-menu>
    </div>
</template>

<script>
import MobileMenu from './MobileMenu.vue';
export default {
    components: {MobileMenu},
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
</style>
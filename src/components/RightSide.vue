<template>
  <div class="col-md-4 d-none d-lg-block ps-0 position-absolute top-0 bottom-0 end-0 overflow-auto right">
    <div class="right-content">
        <div class="balance p-2 text-start">
            <p v-if="!$store.state.auth.user" class="text-white">Not logged in - <router-link to="/Register" class="txt-primary">Join Now</router-link> or <router-link class="txt-primary" to="/Login">Log In</router-link></p>
            <div v-if="user">
                <p class="mb-0">Your balance</p>
                <b>{{ formatBalance(user.balance) }}</b>
            </div>
        
        </div>
        <div class="right-bet_container">
            <div class="nav nav-tabs nav-justified border-0" id="nav-tab" role="tablist">
                <button class="nav-link active py-3 border-0 rounded-0" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Sport </button>
                <button class="nav-link rounded-0 py-3 border-0" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Virtual </button>
            </div>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane show active mt-4 p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="d-flex">
                        <input type="text" class="form-control rounded-0" id="inputPassword2" placeholder="">
                        <button class="btn bg-dark rounded-0 text-white">load</button>
                    </div>
                    <p>Betslip is empty</p>
                    <svg data-v-0739479d="" data-v-848acb24="" class="svg-icon" style="vertical-align: middle;"><!----><use data-v-0739479d="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/icons.c4f70481.svg#empty-betslip"></use></svg>
                </div>
                <div class="tab-pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <p>Betslip is empty</p>
                    <svg data-v-0739479d="" data-v-848acb24="" class="svg-icon" style="vertical-align: middle;"><!----><use data-v-0739479d="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/icons.c4f70481.svg#empty-betslip"></use></svg>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return  {
            user: this.$store.state.auth.user,
            loadidng: false
        }
    },
}
</script>

<style>
.right{
    width: 30% !important;
}

@media only screen and (min-width: 992px) {
  .right{
        width: 28% !important;
        /* z-index: ; */
    }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .right{
        width: 30% !important;
        /* z-index: ; */
    }
}

.right-content{
    height: calc(100vh - 73px);
    border-left: 1px solid rgba(235, 238, 241,.125);
}
.right-bet_container>.nav-tabs>.nav-link{
    color: #fff;
    font-weight: 900;
    background-color: transparent;
}
.right-bet_container>.nav-tabs>.nav-link.active{
    background-color: #23313d;
    color: #fff !important
}
.balance{
    border-bottom: 0.5px solid rgba(235, 238, 241,.125);
}
</style>
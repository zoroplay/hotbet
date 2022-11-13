<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
          <div class="card-body">
              <h4 class="card-title text-start">Create your Account</h4>

              <form action="">
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Phone Number</label>
                    <input type="text" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Password</label>
                    <input type="text" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">First Name</label>
                    <input type="text" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Last Name</label>
                    <input type="text" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="col-12 mb-3 ">
                      <button class="btn bg-success disabled btn-block border-0 rounded-0 w-100 text-white">JOIN NOW</button>
                  </div>
                  <router-link to="/Login" class="text-dark ">I have an account</router-link>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data(){
    return {
      fixtures: [],
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
    }
  },
  methods:{

  }, 
  mounted(){
  },
  beforeCreate(){
    console.log(this.$store.state.live)
    this.$store.dispatch('setCommitLive', false);
  },
  beforeDestroy(){

  }
};
</script>

<style>
.top-image{
  padding: 0px;
}
.page_headline h1{
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 800;

}
</style>

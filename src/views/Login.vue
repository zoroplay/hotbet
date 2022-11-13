<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
          <div class="card-body text-start">
              <h4 class="card-title">Login</h4>
              <p class="card-text">Welcome back. Please log in to your account</p>

              <form action="">
                  <div class="mb-3">
                    <label for="" class="form-label">Username</label>
                    <input type="text" v-model="formData.username" class="form-control rounded-0 bg-transparent text-white" placeholder="" aria-describedby="helpId">
                    <!-- <div class="input-group mb-3">
                      <span class="input-group-text rounded-0" id="basic-addon1">+234</span>
                      <input type="text" class="form-control rounded-0 bg-transparent text-white" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                    </div> -->
                  </div>
                  <div class="mb-3">
                    <label for="" class="form-label">Password</label>
                    <input type="text" v-model="formData.password" class="form-control rounded-0 bg-transparent text-white" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="col-12 mb-3">
                      <button @click.prevent="submit" class="btn bg-success btn-block rounded-0 w-100 text-white">Log In</button>
                  </div>
                  <a href="" class="text-center text-dark">Forgot Password</a>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Home",
  data(){
    return {
      formData:{
        username: '',
        password: ''
      },
      showError: '',
      loading: false,
    }
  },
  methods:{
    ...mapActions(["LogIn"]),
    async submit() {
      try {
          await this.LogIn(this.formData);
          this.$router.push("/");
          this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  }, 
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

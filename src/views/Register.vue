<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
          <div class="card-body">
              <h4 class="card-title text-start">Create your Account</h4>

              <form action="">
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Username</label>
                    <input type="text" v-model="formData.username" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Full Name</label>
                    <input type="text" v-model="formData.full_name" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Email</label>
                    <input type="email" v-model="formData.email" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Phone Number</label>
                    <input type="text" v-model="formData.phone_number" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Password</label>
                    <input type="password" v-model="formData.password" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div>
                  <div class="col-12 mb-3 ">
                      <button @click.prevent="submit" :class="loading == true ? 'disabled' : ''" class="btn bg-success btn-block border-0 rounded-0 w-100 text-white">JOIN NOW</button>
                  </div>
                  <router-link to="/Login" class="text-dark ">I have an account</router-link>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api'
export default {
  name: "Home",
  data(){
    return {
      errorMsg: '',
      showError: false,
      loading: false,
      formData:{
        full_name: '',
        phone: '',
        email: '',
        password: '',
        full_name: '',
        term: true,
        age: true,
        confirm_password: 'password'
      },
    }
  },
  methods:{
    submit() {
      this.loading = true;
      this.formData.confirm_password = this.formData.password
      axios.post("auth/register?client=website", this.formData).then((res)=>{
        if(res.data.success){
          axios.post('/auth/login', res.data.credentials).then(res2 => {
            this.$store.dispatch('LogIn', res2)
            this.loading = false,
            this.$router.push("/");
          }).catch(err => {
            this.loading = false
            this.showError = true;
            this.errorMsg = 'There was a problem with your registration. Try again'
          })
        }
      }).catch(err => {
        this.loading = false
        this.showError = true;
        this.errorMsg = 'There was a problem with your login. Try again'
      })
          
    },
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

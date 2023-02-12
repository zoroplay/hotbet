<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-body">
          <h4 class="card-title text-start">Create your Account</h4>
          <div class="mb-3 text-start">
            <label for="" class="form-label">Username</label>
            <input
              type="text"
              v-model="form.username"
              name=""
              id="username"
              class="form-control rounded-0 text-white bg-transparent"
              placeholder=""
              aria-describedby="helpId"
            />
            <span
              v-if="form.errors().has('username')"
              v-text="form.errors().get('username')"
            ></span>
          </div>
          <div class="mb-3 text-start">
            <label for="" class="form-label">Full Name</label>
            <input
              type="text"
              v-model="form.full_name"
              id="full_name"
              class="form-control rounded-0 text-white bg-transparent"
              placeholder=""
              aria-describedby="helpId"
            />
            <span
              v-if="form.errors().has('full_name')"
              v-text="form.errors().get('full_name')"
            ></span>
          </div>
          <div class="mb-3 text-start">
            <label for="" class="form-label">Email</label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="form-control rounded-0 text-white bg-transparent"
              placeholder=""
              aria-describedby="helpId"
            />
            <span
              v-if="form.errors().has('email')"
              v-text="form.errors().get('email')"
            ></span>
          </div>
          <div class="mb-3 text-start">
            <label for="" class="form-label">Phone Number</label>
            <input
              type="text"
              v-model="form.phone_number"
              id="phone_number"
              class="form-control rounded-0 text-white bg-transparent"
              placeholder=""
              aria-describedby="helpId"
            />
            <span
              v-if="form.errors().has('phone_number')"
              v-text="form.errors().get('pphone_number')"
            ></span>
          </div>
          <div class="mb-3 text-start">
            <label for="" class="form-label">Password</label>
            <input
              type="password"
              v-model="form.password"
              id="password"
              class="form-control rounded-0 text-white bg-transparent"
              placeholder=""
              aria-describedby="helpId"
            />
            <span
              v-if="form.errors().has('password')"
              v-text="form.errors().get('password')"
            ></span>
          </div>
          <div class="col-12 mb-3 ">
            <button
              type="submit"
              :class="loading == true ? 'disabled' : ''"
              :disabled="form.empty()"
              @click="submit"
              class="btn bg-success btn-block border-0 rounded-0 w-100 text-white"
            >
              JOIN NOW
            </button>
          </div>
          <router-link to="/Login" class=" ">I have an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
import form from "vuejs-form";

export default {
  name: "Home",
  data() {
    return {
      errorMsg: "",
      showError: false,
      loading: false,
      form: form({
        full_name: "",
        username: "",
        phone_number: "",
        email: "",
        password: ""
      })
        .rules({
          email: "email|min:5|required",
          password: "required|min:5",
          username: "required|min:3",
          full_name: "required|min:5",
          phone_number: "required|min:5"
        })
        .messages({
          "email.email": "Please enter a valid email",
          "email.min": ":attribute may not have less than :min characters"
        })
    };
  },
  methods: {
    submit() {
      if (this.form.errors().any()) return;

      this.loading = true;
      let client = "website";
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        client = "mobile";
      }

      axios
        .post(`auth/register?client=${client}`, this.form.all())
        .then(res => {
          if (res.data.success) {
            axios
              .post("/auth/login", res.data.credentials)
              .then(res2 => {
                this.$store.dispatch("LogIn", res2);
                (this.loading = false), this.$router.push("/");
              })
              .catch(err => {
                this.loading = false;
                this.showError = true;
                this.errorMsg =
                  "There was a problem with your registration. Try again";
              });
          }
        })
        .catch(err => {
          this.loading = false;
          this.showError = true;
          this.errorMsg = "There was a problem with your login. Try again";
        });
    }
  },
  mounted() {},
  beforeCreate() {
    console.log(this.$store.state.live);
    this.$store.dispatch("setCommitLive", false);
  },
  beforeDestroy() {}
};
</script>

<style>
.top-image {
  padding: 0px;
}
.page_headline h1 {
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 800;
}
</style>

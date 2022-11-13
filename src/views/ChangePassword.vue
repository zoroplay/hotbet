<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-body text-start">
          <h4 class="card-title fw-bold">Change Password</h4>
          <p class="card-text">
            In this section you will be able to modify your password you insert
            a different new password that or from the precedence.
          </p>

          <form action="">
            <div class="mb-3">
              <label for="" class="form-label">Current Password</label>
              <input
                type="text"
                v-model="formData.username"
                class="form-control rounded-0 bg-transparent text-white"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">New Password</label>
              <input
                type="text"
                v-model="formData.password"
                class="form-control rounded-0 bg-transparent text-white"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Confirm Password</label>
              <input
                type="text"
                v-model="formData.password"
                class="form-control rounded-0 bg-transparent text-white"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="col-12 mb-3">
              <button
                @click.prevent="submit"
                class="btn bg-success btn-block rounded-0 w-100 text-white"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-password",
  data() {
    return {
      formData: {
        old_password: "",
        new_password: "",
        c_password: "",
      },
      showError: "",
      loading: false,
    };
  },
  methods: {},
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

<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-header page_headline py-3">
          <h4 class="card-title text-start mb-0">Withdraw</h4>
        </div>
        <div class="card-body">
          <p class="text-start">
            Making a withdrawal is free and easy. Just enter these details and
            then click WITHDRAW.
          </p>
          <div class="card-body px-1" style="background-color: #1c1e24;">
            <div class="d-flex justify-content-start align-items-start">
              <span style="font-size: 28px"
                ><i class="bi bi-phone me-3"></i
              ></span>
              <div class="">
                <small>Your Phone number</small>
                <p class="mb-0 text-start">{{ user.details.phone_number }}</p>
              </div>
            </div>
          </div>
          <form action="">
            <div class="mb-3 text-start">
              <label for="" class="form-label">Amount</label>
              <input
                type="text"
                name=""
                id=""
                class="form-control rounded-0 text-white bg-transparent"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <!-- <div class="mb-3 text-start">
                    <label for="" class="form-label">Bank Name</label>
                    <select class="form-control form-select rounded-0 text-white bg-transparent" name="" id="">
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                  </div>
                  <div class="mb-3 text-start">
                    <label for="" class="form-label">Account Number</label>
                    <input type="number" name="" id="" class="form-control rounded-0 text-white bg-transparent" placeholder="" aria-describedby="helpId">
                  </div> -->
            <div class="col-12 mb-3 ">
              <button
                class="btn bg-success disabled btn-block border-0 rounded-0 w-100 text-white"
              >
                WITHDRAW
              </button>
            </div>
            <router-link to="/Login" class="text-dark "
              >I have an account</router-link
            >
          </form>
        </div>
      </div>
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-header page_headline py-3">
          <h4 class="card-title text-start mb-0">Withdraw via Shop</h4>
        </div>
        <div class="card-body">
          <p class="text-start">
            Enter your desired amount and your withdrawal will be processed as
            soon as possible.
          </p>
          <div v-if="message != ''" class="alert alert-info alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>Success!</strong> {{ message }}.
          </div>
          
          <div class="mb-3 text-start">
              <label for="" class="form-label">Amount</label>
              <input
                type="number"
                v-model="withdrawViaShop.amount"
                class="form-control rounded-0 text-white bg-transparent"
                placeholder=""
                aria-describedby="helpId"
              />
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between">
                <button
                  class="btn btn-secondary btn-sm w-20 rounded-0 me-2"
                  @click.prevent="clearAmount"
                >
                  Clear
                </button>
                <button
                  class="btn btn-secondary btn-sm w-20 rounded-0 me-2"
                  @click.prevent="updateAmount(100)"
                >
                  +100
                </button>
                <button
                  class="btn btn-secondary btn-sm w-20 rounded-0 me-2"
                  @click.prevent="updateAmount(200)"
                >
                  +200
                </button>
                <button
                  class="btn btn-secondary btn-sm w-20 rounded-0 me-2"
                  @click.prevent="updateAmount(500)"
                >
                  +500
                </button>
                <button
                  class="btn btn-secondary btn-sm w-20 rounded-0"
                  @click.prevent="updateAmount(1000)"
                >
                  +1000
                </button>
              </div>
            </div>
            <div class="col-12 mb-3 ">
              <button
                @click.prevent="submitRequest"
                class="btn bg-success btn-block border-0 rounded-0 w-100 text-white"
              >
                MAKE WITHDRAWAL
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/api";
export default {
  name: "deposit",
  data() {
    return {
      withdrawForm: {
        amount: 0,
      },
      withdrawViaShop: {
        amount: 0,
      },
      user: [],
      loading: false,
      message: ''
    };
  },
  methods: {
    async getUserDetails() {
      let user = await axios.get("/auth/details");
      this.user = user.data.user;
    },
    submitRequest() {
      this.loading = true
      axios
        .post("user/account/online/withdraw", this.withdrawViaShop)
        .then((res) => {
          this.withdrawViaShop.amount = 0;
          this.message = res.data.message;
          this.loading = false
        });
    },
    updateAmount(value) {
      this.withdrawViaShop.amount = parseInt(this.withdrawViaShop.amount) + parseInt(value)
    },
    clearAmount(){
      this.withdrawViaShop.amount = 0;
    }
  },
  mounted() {
    this.getUserDetails();
  },
  beforeCreate() {
    console.log(this.$store.state.live);
    this.$store.dispatch("setCommitLive", false);
  },
  beforeDestroy() {},
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
.w-20 {
  width: 20% !important;
}
</style>

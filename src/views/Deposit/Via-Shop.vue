<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-header page_headline py-3">
          <h4 class="card-title text-start mb-0">Deposit via Shop</h4>
        </div>
        <div class="card-body">
          <div v-if="message != ''" class="alert alert-info alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            Your deposit PIN is <strong>{{ deposit_code }}</strong>. Take it to any shop to complete your deposit.
          </div>
          
          <div class="mb-3 text-start">
              <label for="" class="form-label">Amount</label>
              <input
                type="number"
                v-model="deposit.amount"
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
                Generate Deposit Code
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
      deposit: {
        amount: 0,
      },
      user: [],
      loading: false,
      message: '',
      deposit_code: ''
    };
  },
  methods: {
    submitRequest() {
      this.loading = true
      axios
        .post("user/account/deposit?channel=mobile", this.deposit)
        .then((res) => {
          this.deposit.amount = 0;
          this.message = res.data.message;
          this.deposit_code = res.data.data.code
          this.loading = false
        });
    },
    updateAmount(value) {
      this.deposit.amount = parseInt(this.deposit.amount) + parseInt(value)
    },
    clearAmount(){
      this.deposit.amount = 0;
    }
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

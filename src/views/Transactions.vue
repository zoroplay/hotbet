<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
        <div class="card-body text-start border-bottom pb-1">
          <h4 class="card-title fw-bold page_headline">Statement</h4>
          <p>Balance: {{ formatBalance(user.balance) }}</p>
        </div>
        <div class="table-responsive">
          <table class="table text-white text-start">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
                <th scope="col">Change</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr class="" v-for="(data, index) in list" :key="index">
                <td scope="row">{{ formatDate(data.created_at) }}</td>
                <td>{{ data.subject }} {{ data.description}}</td>
                <td> 
                    <span class="text-danger" v-if="data.tranx_type == 'debit'">-{{ data.amount }}</span>
                    <span class="text-success" v-if="data.tranx_type == 'credit'">+{{ data.amount }}</span>
                </td>
                <td>{{ data.from_user_balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "@/services/api";

export default {
  name: "deposit",
  data() {
    return {
      page: 1,
      filterData: {
        type: "",
        from: moment(moment().subtract(1, "w") .toDate()).format('DD/MM/YYYY'),
        to: moment(moment().toDate()).format('DD/MM/YYYY'),
        page_size: 20,
      },
      list: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getTransactions() {
      axios
        .post(
          `user/account/get-transactions?page=${this.page}`,
          this.filterData
        )
        .then((res) => {
            this.list = res.data.transactions.data
        });
    },
    formatDate(date){
        return moment(date).format('DD/MM h:mm a')
    }
  },
  mounted() {
    this.getTransactions();
  },
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

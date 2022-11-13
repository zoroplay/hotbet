<template>
  <div class="center-body">
    <div class="center-content">
      <div class="top-image border-bottom">
        <img src="@/assets/op.jpeg" class="img-fluid" alt="">
      </div>
      <div class="center-game_list">
        <div class="card bg-transparent border-0 rounded-0 rounded-0">
          <div class="card-header text-start page_headline py-3">
            <h1>Upcoming</h1>
          </div>
          <div v-if="loading" class="loading mt-5 text-center">
            <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
          </div>
          <fixtures :fixtures="fixtures" v-if="!loading && fixtures.length"></fixtures>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fixtures from '../components/Fixtures.vue';
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/services/api"
export default {
  components: { Fixtures },
  name: "Home",
  data(){
    return {
      fixtures: [],
      tournaments: [],
      live: this.$store.state.live,
      loading: false,
      sport_id : this.$store.state.sport_id
    }
  },
  methods:{
    getUpcoming(){
        this.loading = true;
        let today = new Date();
        let future = new Date();
        future.setDate(today.getDate() + 7)
        let start = today.getFullYear() + "-" + (today.getMonth()+1)   + "-"  + today.getDate();
        let end = future.getFullYear() + "-" + (future.getMonth()+1)   + "-"  + future.getDate();

        axios.get(`sports/get-fixtures-by-date?date=${start}&end_date=${end}&sid=${this.sport_id}&channel=mobile&limit=15&page=1`).then((res) => {
            this.loading = false;
            this.fixtures = res.data.fixtures.data
        })
    },
    
  }, 
  mounted(){
    this.getUpcoming()
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

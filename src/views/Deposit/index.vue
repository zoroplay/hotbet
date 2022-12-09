<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
          <div class="card-body text-start">
            
            <h4 class="card-title fw-bold">Deposit</h4>
            <div class="card page-headline border-top-0">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="mb-0">Deposit via Mobile Money</p>
                    <i class="bi bi-arrow-right"></i>
                </div>
            </div>
            <router-link to="/deposit/shop" class="text-white text-decoration-none">
                <div class="card page-headline border-top-0">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <p class="mb-0">Deposit via Shop</p>
                        <i class="bi bi-arrow-right"></i>
                    </div>
                </div>
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deposit",
  data(){
    return {
      
      showError: '',
      loading: false,
    }
  },
  methods:{
    
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

<template>
  <div class="center-body">
    <div class="center-content">
      <div class="card bg-transparent rounded-0 border-0">
          <div class="card-body text-start">
            
            <h4 class="card-title fw-bold">Deposit</h4>
            <div class="card page-headline border-top-0">
                <div class="card-body text-center">
                    <p class="text-center">Choose your desired payment method</p>
                    <router-link to="/">
                      <img src="https://www.betpawa.ug/media/test/m-dva9mmxb7cv7kcmtwppikavak" style="height: 100px; border: 5px solid white;" class="mx-2" alt="">
                    </router-link>
                    <router-link to="/">
                      <img src="https://www.betpawa.ug/media/m-dvtu35x6f2r7526lnr5dxrci1" alt="" style="height: 100px; border: 5px solid white;" class="mx-2" srcset="">
                    </router-link>
                </div>
            </div>
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

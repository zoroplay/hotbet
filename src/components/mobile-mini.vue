<template>
  <div class="py-3 mobile-mini">
    <div class="container-lg container-lg">
      <div class="row gx-2">
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/">
            <div class="card page-headline">
              <div class="card-body p-2 text-nowrap">
                <p class="mb-0"><i class="bi bi-broadcast"></i></p> 
                <small>Highlights</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/Live">
            <div class="card page-headline">
              <div class="card-body py-2">
                <p class="mb-0"><i class="bi bi-activity"></i></p> 
                <small>Live</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/Casino">
            <div class="card page-headline">
              <div class="card-body px-2">
                <i class="bi bi-suit-spade"></i> <br />
                <small>Casino</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/Virtual">
            <div class="card page-headline">
              <div class="card-body py-2">
                <p class="mb-0"><i class="bi bi-cast"></i></p> 
                <small>Virtual</small>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card.page-headline {
  background-color: #23313d;
  color: #fff;
  border-radius: 0;
  border-top: 2px solid #ee3135;
}
@media screen and (max-width: 360px) {
  .mobile-mini .card .card-body small, .mobile-mini .card .card-body i{
    font-size: 9px;
  }
}
</style>

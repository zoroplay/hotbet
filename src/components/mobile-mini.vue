<template>
  <div class="py-3">
    <div class="container-lg container-lg">
      <div class="row gx-2">
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/">
            <div class="card page-headline">
              <div class="card-body px-2">
                <i class="bi bi-broadcast"></i> <br />
                <small>Highlights</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/Live">
            <div class="card page-headline">
              <div class="card-body">
                <i class="bi bi-activity"></i> <br />
                <small>Live</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/">
            <div class="card page-headline">
              <div class="card-body px-2">
                <i class="bi bi-calendar-event"></i> <br />
                <small>Upcoming</small>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-3">
          <router-link class="text-decoration-none text-white" to="/Virtual">
            <div class="card page-headline">
              <div class="card-body">
                <i class="bi bi-cast"></i> <br />
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
</style>

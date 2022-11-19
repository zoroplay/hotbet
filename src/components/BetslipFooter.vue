<template>
  <div>
      <div v-if="betslip.selections.length" v-b-toggle.betslip-menu class="d-lg-none text-start position-absolute bottom-0 position-fixed w-100" style="background-color: #1c1e24">
        <div class="bg-warning" style="background-color: #">
            <small class="text-dark px-2">Add 1 more selection for 3% bonus</small>
        </div>
        <div class="px-3 py-2 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn rounded-0 p-1 bg-warning rounded-5 me-3"> <img src="@/assets/img/mybets_black.png" style="height: 20px" alt="" srcset="">{{betslip.selections.length}}</button>
                <span>Odds: {{ betslip.totalOdds }}</span>
            </div>
            <div>
                <i class="bi bi-caret-left-fill text-white"></i>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "betslip-footer",
    props: ["betslip"]
}
</script>

<style>

</style>
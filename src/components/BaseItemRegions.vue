<template>
  <div class="app-item-regions">
  </div>
</template>

<script>
export default {
  props: ['regions'],

  beforeMount: function() {
    if(this.$store.state.reaper.ready)
      wwr_req("")
  },

  beforeDestroy: function() {

  }
}
</script>

<style scoped>

</style>

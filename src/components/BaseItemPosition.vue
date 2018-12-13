<template>
  <div class="app-item-position-info" :style="{ color: item.textcolor }">

      <span>{{transport.position_string}}</span>

  </div>
</template>

<script>
export default {
  props: ['item', 'transport'],

  beforeMount: function() {
    // FIXME only do this once!
    if(this.$store.state.reaper.ready)
      wwr_req_recur('TRANSPORT', 20)
  },

  beforeDestroy: function() {
    if(this.$store.state.reaper.ready)
      wwr_req_recur_cancel('TRANSPORT')
  }
}
</script>

<style scoped>

</style>
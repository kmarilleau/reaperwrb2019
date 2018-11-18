<template>
  <div class="app-item-transport-container" :style="{ color: item.textcolor }">

    <a @click.stop="onPlay()">
      <font-awesome-icon icon="play" size="1x" />    
    </a>

    <a @click.stop="onPause()">
      <font-awesome-icon icon="pause" size="1x" />
    </a>

    <a @click.stop="onToggleRepeat()">
      <font-awesome-icon icon="redo" sitze="1x" />
    </a>

    <a @click.stop="onStop()">
      <font-awesome-icon icon="stop" size="1x" />
    </a>

    <span class="app-item-transport-position">
      {{this.$store.state.reaper.transport.position_string}}
    </span>

  </div>
</template>

<script>
export default {
  props: ['item', 'transport'],

  methods: {
    onPlay() { wwr_req(1007) },
    onStop() { wwr_req(1016) },
    onPause() { wwr_req(1008) },
    onToggleRepeat() { wwr_req('SET/REPEAT/-1') },
  },

  beforeMount: function() {
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
<template>
  <div :style="{ color: item.textcolor }">
    <div class="app-item-transport-container">

      <a @click.stop="onStop()" class="app-item-transport-icon">
        <font-awesome-icon icon="stop" size="4x" />
      </a>

      <a @click.stop="onPlay()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 1 }"
      >
        <font-awesome-icon icon="play" size="4x" />    
      </a>

      <a @click.stop="onPause()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 2 }"
      >
        <font-awesome-icon icon="pause" size="4x" />
      </a>

      <a @click.stop="onRecord()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 5 }"
        :style="{ color: parseInt(transport.playstate) === 5 ? '#F44E3B' : item.textcolor }"
      >
        <font-awesome-icon icon="circle" size="4x" />
      </a>

      <a 
        @click.stop="onToggleRepeat()" 
        class="app-item-transport-icon"
        :style="{ color: parseInt(transport.repeat) > 0 ? '#4ef442' : item.textcolor }"
      >
        <font-awesome-icon icon="sync-alt" size="4x" />
      </a>

    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'transport'],

  beforeMount() {
    if(!this.$store.state.reaper.transport.online)
      this.$store.commit('execAction', { action: 'TRANSPORT', recur: 20 })
  },

  beforeDestroy() {
    this.$store.commit('cancelAction', { action: 'TRANSPORT' })
  },

  methods: {
    onPlay() { this.$store.commit('execAction', { action: 1007 }) },
    onStop() { this.$store.commit('execAction', { action: 1016 }) },
    onPause() { this.$store.commit('execAction', { action: 1008 }) },
    onRecord() { this.$store.commit('execAction', { action: 1013 }) },
    onToggleRepeat() { this.$store.commit('execAction', { action: 'SET/REPEAT/-1' }) },
  },
  
}
</script>

<style scoped>
</style>
<template>
  <div :style="{ color: item.textcolor }">
    <div class="app-item-transport-container">
    <a @click.stop="onPlay()" class="app-item-transport-icon"
      :class="{ blink: transport.playstate == 1 }"
    >
      <font-awesome-icon icon="play" size="4x" />    
    </a>

    <a @click.stop="onPause()" class="app-item-transport-icon">
      <font-awesome-icon icon="pause" size="4x" />
    </a>

    <a @click.stop="onRecord()" class="app-item-transport-icon">
      <font-awesome-icon icon="circle" size="4x" />
    </a>

    <a @click.stop="onToggleRepeat()" class="app-item-transport-icon">
      <font-awesome-icon icon="redo" size="4x" />
    </a>

    <a @click.stop="onStop()" class="app-item-transport-icon">
      <font-awesome-icon icon="stop" size="4x" />
    </a>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'transport'],

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
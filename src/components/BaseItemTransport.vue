<template>
  <div :style="{ color: item.textcolor }">
    <div class="app-item-transport-container"
      :style="{ 'height': this.$store.getters.itemHeight + 'px'}"
    > 

      <a @click="onStop()" class="app-item-transport-icon">
        <svgicon icon="transport-stop" 
          :height="this.$store.getters.iconSize + 'px'"
          :width="this.$store.getters.iconSize + 'px'"
        />
      </a>

      <a @click="onPlay()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 1 }"
      >
        <svgicon icon="transport-play" 
          :height="this.$store.getters.iconSize + 'px'"
          :width="this.$store.getters.iconSize + 'px'"
        />
      </a>

      <a @click="onPause()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 2 }"
      >
        <svgicon icon="transport-pause" 
          :height="this.$store.getters.iconSize + 'px'"
          :width="this.$store.getters.iconSize + 'px'"
        />
      </a>

      <a @click="onRecord()" class="app-item-transport-icon"
        :class="{ blink: parseInt(transport.playstate) === 5 }"
        :style="{ color: parseInt(transport.playstate) === 5 ? '#F44E3B' : item.textcolor }"
      >
        <svgicon icon="transport-record" 
          :height="this.$store.getters.iconSize + 'px'"
          :width="this.$store.getters.iconSize + 'px'"
        />
      </a>

      <a 
        @click="onToggleRepeat()" 
        class="app-item-transport-icon"
        :style="{ color: parseInt(transport.repeat) > 0 ? '#4ef442' : item.textcolor }"
      >
        <svgicon icon="transport-loop" 
          :height="this.$store.getters.iconSize + 'px'"
          :width="this.$store.getters.iconSize + 'px'"  
        />
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
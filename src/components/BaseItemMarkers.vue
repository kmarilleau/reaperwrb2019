<template>
  <div class="app-item-container app-item-markers">
    
    <div class="app-item-markers-nav">
      <a class="app-item-markers-icon" 
        @click.stop="onPreviousMarker()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-left" size="5x" />
      </a>
      <div class="app-item-markers-info">
        <template v-if="this.$store.state.reaper.markers.length > 0">
          <span :style="{ color: item.textcolor }">Marker: {{ this.$store.state.reaper.markers[this.$store.state.reaper.marker].id }}</span>
          <span :style="{ color: item.textcolor }">{{ this.$store.state.reaper.markers[this.$store.state.reaper.marker].name }}</span>
        </template>
      </div>
      <a class="app-item-markers-icon"
        @click.stop="onRefresh()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="sync-alt" size="4x" />
      </a>
      <a class="app-item-markers-icon"
        @click.stop="onNextMarker()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-right" size="5x" />
      </a>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'markers'],

  methods: {
    onPreviousMarker(event) {
      const markers  = this.$store.state.reaper.markers
      markers.forEach((marker) => console.log("id %s name %s", marker.id, marker.name))
      const marker = this.$store.state.reaper.marker
      this.$store.state.reaper.marker = marker - 1 < 0 ? markers.length - 1 : marker - 1
      const id = markers[marker].id
      this.$store.commit('execAction', { action: 'SET/POS_STR/m' + id })
    },

    onNextMarker(event) {
      const markers  = this.$store.state.reaper.markers
      const marker = this.$store.state.reaper.marker
      this.$store.state.reaper.marker = marker + 1 == markers.length ? 0 : marker + 1
      const id = markers[marker].id
      this.$store.commit('execAction', { action: 'SET/POS_STR/m' + id })
    },

    onRefresh(event) {
      this.$store.commit('execAction', { action: 'MARKER' })
    }
  },

  beforeMount() {
    this.$store.commit('execAction', { action: 'MARKER' })
  },
}
</script>

<style scoped>
</style>
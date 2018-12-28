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
          <span :style="{ color: item.textcolor }">Marker: {{ id }}</span>
          <span :style="{ color: item.textcolor }">{{ name }}</span>
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

  data() {
    return {
      id: 0,
      name: '',
    }
  },

  methods: {
    onPreviousMarker(event) {
      if(this.$store.state.reaper.ready) {
        const markers  = this.$store.state.reaper.markers
        const marker = this.$store.state.reaper.marker
        this.$store.state.reaper.marker = marker - 1 < 0 ? markers.length - 1 : marker - 1
        this.id = markers[marker].id
        this.name = markers[marker].name
        this.$store.commit('execAction', { action: 'SET/POS_STR/m' + this.id })
      }
    },

    onNextMarker(event) {
      if(this.$store.state.reaper.ready) {
        const markers  = this.$store.state.reaper.markers
        const marker = this.$store.state.reaper.marker
        this.$store.state.reaper.marker = (marker + 1 === markers.length) ? 0 : marker + 1
        this.id = markers[marker].id
        this.name = markers[marker].name
        this.$store.commit('execAction', { action: 'SET/POS_STR/m' + this.id })
      }
    },

    onRefresh(event) {
      this.$store.commit('execAction', { action: 'MARKER' })
    },
  },

  beforeMount() {
    this.$store.commit('execAction', { action: 'MARKER' })
  },
}
</script>

<style scoped>
</style>
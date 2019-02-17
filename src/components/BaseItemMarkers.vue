<template>
  <div class="app-item-container app-item-markers">
    
    <div class="app-item-markers-nav">
      <a class="app-item-markers-icon" 
        @click.stop="onPreviousMarker()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="marker-previous" />
      </a>
      <div class="app-item-markers-info">
        <template v-if="this.$store.getters.hasMarkers">
          <span :style="{ color: item.textcolor }">Marker: {{ id }}</span>
          <span :style="{ color: item.textcolor }">{{ name }}</span>
        </template>
        <template v-if="this.$store.getters.isModeEditor && !this.$store.getters.hasMarkers">
          <span :style="{ color: item.textcolor }">Marker: 1</span>
          <span :style="{ color: item.textcolor }">Name</span>
        </template>
      </div>
      <a class="app-item-markers-icon"
        @click.stop="onRefresh()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="sync" />
      </a>
      <a class="app-item-markers-icon"
        @click.stop="onNextMarker()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="marker-next" />
      </a>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'markers'],

  data() {
    return {
      id: '',
      name: '',
      current: 0,
    }
  },

  methods: {
    onPreviousMarker(event) {
      const markers  = this.$store.getters.getMarkers
      if(markers.length > 0) {
        this.current = this.current - 1 < 0 ? markers.length - 1 : this.current - 1
        this.id = markers[this.current].id
        this.name = markers[this.current].name
        this.$store.commit('execAction', { action: 'SET/POS_STR/m' + this.id })
      }
    },

    onNextMarker(event) {
      const markers  = this.$store.getters.getMarkers
      if(markers.length > 0) {
        this.current = (this.current + 1 === markers.length) ? 0 : this.current + 1
        this.id = markers[this.current].id
        this.name = markers[this.current].name
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
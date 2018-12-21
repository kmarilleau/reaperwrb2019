<template>
  <div class="app-item-container app-item-markers">
    
    <div class="app-item-markers-nav">
      <div class="app-item-markers-icon">
        <a @click.stop="onPreviousMarker()">
          <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-left" size="5x" />
        </a>
      </div>
      <div class="app-item-markers-info">
        <template v-if="this.$store.state.reaper.markers.length > 0">
          <span :style="{ color: item.textcolor }">Marker: {{ this.$store.state.reaper.markers[this.$store.state.reaper.marker].id }}</span>
          <span :style="{ color: item.textcolor }">{{ this.$store.state.reaper.markers[this.$store.state.reaper.marker].name }}</span>
        </template>
      </div>
      <div class="app-item-markers-icon">
        <a @click.stop="onRefresh()">
        <font-awesome-icon :style="{ color: item.textcolor }" icon="sync-alt" size="4x" />
        </a>
      </div>
      <div class="app-item-markers-icon">
        <a @click.stop="onNextMarker()">
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-right" size="5x" />
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'markers'],

  methods: {
    onPreviousMarker(event) {
      console.log("previous region")
      const markers  = this.$store.state.reaper.markers
      const marker = this.$store.state.reaper.marker
      this.$store.state.reaper.marker = marker - 1 < 0 ? markers.length - 1 : marker - 1
      const id = markers[marker].id

      if(this.$store.state.reaper.ready)
        wwr_req('SET/POS_STR/m' + id)
    },

    onNextMarker(event) {
      const markers  = this.$store.state.reaper.markers
      console.log(markers)
      const marker = this.$store.state.reaper.marker
      this.$store.state.reaper.marker = marker + 1 == markers.length ? 0 : marker + 1
      const id = markers[marker].id
      if(this.$store.state.reaper.ready)
        wwr_req('SET/POS_STR/m' + id)   
    },

    onRefresh(event) {
      if(this.$store.state.reaper.ready)
        wwr_req("MARKER")
    }
  },

  beforeMount() {
    if(this.$store.state.reaper.ready)
      wwr_req("MARKER")
  },
}
</script>

<style scoped>
</style>
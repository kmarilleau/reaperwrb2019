<template>
  <div class="app-item-container app-item-regions">
    <div class="app-item-regions-nav">
      <div class="app-item-regions-icon">
        <a @click.stop="onPreviousMarker()">
          <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-left" size="5x" />
        </a>
      </div>
      <div class="app-item-regions-info">
        <span :style="{ color: item.textcolor }">{{ this.$store.state.reaper.region }}</span>
      </div>
      <div class="app-item-regions-icon">
        <a @click.stop="onRefresh()">
        <font-awesome-icon :style="{ color: item.textcolor }" icon="sync-alt" size="5x" />
        </a>
      </div>
      <div class="app-item-regions-icon">
        <a @click.stop="onNextMarker()">
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-right" size="5x" />
        </a>
      </div>
    </div>

    <div class="app-item-label">
      <span :style="{ color: item.textcolor }">Region: {{ this.$store.state.reaper.regions[this.$store.state.reaper.region].name }}</span>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'regions'],


  methods: {
    onPreviousRegion: function(event) {
      if(this.$store.state.reaper.ready)
        wwr_req('SET/POS_STR/r' + id)
    },
    onNextRegion: function(event) {
      if(this.$store.state.reaper.ready)
        wwr_req('SET/POS_STR/r' + id)   
    },
    onRefresh: function(event) {
      if(this.$store.state.reaper.ready)
        wwr_req("REGION")
    }
  },

  beforeMount: function() {
    if(this.$store.state.reaper.ready)
      wwr_req("REGION")
  },

}
</script>

<style scoped>
.app-item-regions-nav {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  margin: 20px 0 0 0;
}
.app-item-regions-info,
.app-item-regions-icon {
  margin: auto;
}
.app-item-regions-info * {
  font-size: 5em;
}
</style>

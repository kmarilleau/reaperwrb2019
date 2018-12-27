<template>
  <div class="app-item-container app-item-regions">
    <div class="app-item-regions-nav">
      <a class="app-item-regions-icon" 
        @click.stop="onPreviousRegion()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-left" size="5x" />
      </a>
      <div class="app-item-regions-info">
        <template v-if="this.$store.state.reaper.regions.length > 0">
          <span :style="{ color: item.textcolor }">Region: {{ this.$store.state.reaper.regions[this.$store.state.reaper.region].id }}</span>
          <span :style="{ color: item.textcolor }">{{ this.$store.state.reaper.regions[this.$store.state.reaper.region].name }}</span>
        </template>
      </div>
      <a class="app-item-regions-icon" 
        @click.stop="onRefresh()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="sync-alt" size="4x" />
      </a>
      <a class="app-item-regions-icon" 
        @click.stop="onNextRegion()"
      >
        <font-awesome-icon :style="{ color: item.textcolor }" icon="chevron-right" size="5x" />
      </a>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'regions'],

  methods: {
    onPreviousRegion(event) {
      const regions  = this.$store.state.reaper.regions
      const region = this.$store.state.reaper.region
      this.$store.state.reaper.region = region - 1 < 0 ? regions.length - 1 : region - 1
      const id = regions[region].id

      this.$store.commit('execAction', { action: 'SET/POS_STR/r' + id })
    },

    onNextRegion(event) {
      const regions  = this.$store.state.reaper.regions
      const region = this.$store.state.reaper.region
      this.$store.state.reaper.region = region + 1 == regions.length ? 0 : region + 1
      const id = regions[region].id

      this.$store.commit('execAction', { action: 'SET/POS_STR/r' + id })
    },

    onRefresh(event) {
      this.$store.commmit('execAction', { action: 'REGION' })
    }
  },

  beforeMount() {
    if(this.$store.state.reaper.ready)
      this.$store.commmit('execAction', { action: 'REGION' })
  },

}
</script>

<style scoped>
</style>

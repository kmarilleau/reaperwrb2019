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
          <span :style="{ color: item.textcolor }">Region: {{ id }}</span>
          <span :style="{ color: item.textcolor }">{{ name }}</span>
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

  data() {
    return {
      id: '',
      name: '',
      current: 0
    }
  },

  methods: {
    onPreviousRegion(event) {
      const regions  = this.$store.state.reaper.regions
      const region = this.$store.state.reaper.region
      if(regions.length > 0) {
        this.current = this.current - 1 < 0 ? regions.length - 1 : this.current - 1
        this.id = regions[this.current].id
        this.name = regions[this.current].name
        this.$store.commit('execAction', { action: 'SET/POS_STR/r' + this.id })
      }
    },

    onNextRegion(event) {
      const regions  = this.$store.state.reaper.regions
      const region = this.$store.state.reaper.region
      if(regions.length > 0) {
        this.current = (this.current + 1 === regions.length) ? 0 : this.current + 1
        this.id = regions[this.current].id
        this.name = regions[this.current].name 
        this.$store.commit('execAction', { action: 'SET/POS_STR/r' + this.id })
      }
    },

    onRefresh(event) {
      this.$store.commit('execAction', { action: 'REGION' })
    }
  },

  beforeMount() {
    if(this.$store.state.reaper.ready)
      this.$store.commit('execAction', { action: 'REGION' })
  },

}
</script>

<style scoped>
</style>

<template>
  <div class="app-item-container app-item-regions">
    <div class="app-item-regions-nav">
      <a class="app-item-regions-icon" 
        @click.stop="onPreviousRegion()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="region-previous" 
          :height="this.$store.getters.iconSize"
          :width="this.$store.getters.iconSize"
        />
      </a>
      <div class="app-item-regions-info">
        <template v-if="this.$store.getters.hasRegions">
          <span :style="{ color: item.textcolor }">Region: {{ id }}</span>
          <span :style="{ color: item.textcolor }">{{ name }}</span>
        </template>
        <template v-if="this.$store.getters.isModeEditor && !this.$store.getters.hasRegions">
          <span :style="{ color: item.textcolor }">Region: 1</span>
          <span :style="{ color: item.textcolor }">Name thius is a along as name</span>
        </template>
      </div>
      <a class="app-item-regions-icon" 
        @click.stop="onRefresh()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="sync" 
          :height="this.$store.getters.iconSize"
          :width="this.$store.getters.iconSize"
        />
      </a>
      <a class="app-item-regions-icon" 
        @click.stop="onNextRegion()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="region-next" 
          :height="this.$store.getters.iconSize"
          :width="this.$store.getters.iconSize"
        />
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
      const regions  = this.$store.getters.getRegions
      if(regions.length > 0) {
        this.current = this.current - 1 < 0 ? regions.length - 1 : this.current - 1
        this.id = regions[this.current].id
        this.name = regions[this.current].name
        this.$store.commit('execAction', { action: 'SET/POS_STR/r' + this.id })
      }
    },

    onNextRegion(event) {
      const regions  = this.$store.getters.getRegions
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
    if(this.$store.getters.reaperReady)
      this.$store.commit('execAction', { action: 'REGION' })
  },

}
</script>

<style scoped>
</style>

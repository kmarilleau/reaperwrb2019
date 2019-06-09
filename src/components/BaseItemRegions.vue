<template>
  <div class="app-item-container app-item-regions">
    <div class="app-item-regions-nav">
      <a class="app-item-regions-icon" 
        @click="onPreviousRegion()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="region-previous" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>
      <div class="app-item-regions-info">
        <template v-if="hasRegions">
          <span :style="{ color: item.textcolor }">Region: {{ id }}</span>
          <span :style="{ color: item.textcolor }">{{ name }}</span>
        </template>
        <template v-if="isModeEditor && !hasRegions">
          <span :style="{ color: item.textcolor }">Region: 1</span>
          <span :style="{ color: item.textcolor }">Name</span>
        </template>
      </div>
      <a class="app-item-regions-icon" 
        @click="onRefresh()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="sync" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>
      <a class="app-item-regions-icon" 
        @click="onNextRegion()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="region-next" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['item', 'regions'],

  data() {
    return {
      id: '',
      name: '',
      current: 0
    }
  },

  beforeMount() {
    if(this.reaperReady)
      this.execAction({ action: 'REGION' })
  },

  computed: {
    ...mapGetters([
      'iconSize',
      'reaperReady',
      'getRegions',
      'isModeEditor'
    ])
  },

  methods: {
    ...mapMutations([
      'execAction'
    ]),

    onPreviousRegion(event) {
      const regions  = this.getRegions
      if(regions.length > 0) {
        this.current = this.current - 1 < 0 ? regions.length - 1 : this.current - 1
        this.id = regions[this.current].id
        this.name = regions[this.current].name
        this.execAction({ action: 'SET/POS_STR/r' + this.id })
      }
    },

    onNextRegion(event) {
      const regions  = this.getRegions
      if(regions.length > 0) {
        this.current = (this.current + 1 === regions.length) ? 0 : this.current + 1
        this.id = regions[this.current].id
        this.name = regions[this.current].name 
        this.execAction({ action: 'SET/POS_STR/r' + this.id })
      }
    },

    onRefresh(event) {
      this.execAction({ action: 'REGION' })
    }
  },

}
</script>

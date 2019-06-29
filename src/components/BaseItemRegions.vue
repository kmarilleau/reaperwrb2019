<template>
  <div class="app-item__container app-item__regions">
    <div class="app-item__regions-nav">

      <a class="app-item__regions-icon" 
        @click="onPreviousRegion()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="region-previous" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <div class="app-item__regions-info"
        @click="onRefresh()"
      >
        <span v-if="hasRegions" :style="{ color: item.textcolor }">{{ id }}: {{ name }}</span>
        <span v-if="!hasRegions" :style="{ color: item.textcolor }">tab to refresh</span>
      </div>

      <a class="app-item__regions-icon" 
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
  props: ['item'],

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
      'hasRegions',
      'getRegions',
      'isAppModeEditor'
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

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
        <span v-if="hasRegions" :style="{ color: item.textcolor }">{{ getRegionId }}: {{ getRegionName }}</span>
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
      this.execAction({ action: 'REGION', recur: 250 })
  },

  computed: {
    ...mapGetters([
      'iconSize',
      'reaperReady',
      'hasRegions',
      'getRegions',
      'getRegionId',
      'getRegionIdx',
      'getRegionName',
      'getRegionLastId',
      'isAppModeEditor'
    ]),
  },

  methods: {
    ...mapMutations([
      'execAction'
    ]),

    onPreviousRegion(event) {
      this.execAction({ action: "prev_region", script_action: true })
    },

    onNextRegion(event) {
      this.execAction({ action: "next_region", script_action: true })
    },

    onRefresh(event) {
      this.execAction({ action: "REGION" })
    }
  },

}
</script>

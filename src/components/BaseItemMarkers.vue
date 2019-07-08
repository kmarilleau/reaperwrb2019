<template>
  <div class="app-item__container app-item__markers">
    
    <div class="app-item__markers-nav">
      <a class="app-item__markers-icon" 
        @click="onPreviousMarker()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="marker-previous" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <div class="app-item__markers-info"
        @click="onRefresh()"
      >
        <span v-if="hasMarkers" :style="{ color: item.textcolor }">{{ getMarkerId }}: {{ getMarkerName }}</span>
        <span v-if="!hasMarkers" :style="{ color: item.textcolor }">tab to refresh</span>
      </div>

      <a class="app-item__markers-icon"
        @click="onNextMarker()"
        :style="{ color: item.textcolor }"
      >
        <svgicon icon="marker-next" 
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

  beforeMount() {
    this.execAction({ action: 'MARKER', recur: 250 })
  },

  computed: {
    ...mapGetters([
      'iconSize',
      'hasMarkers',
      'isAppModeEditor',
      'getMarkers',
      'getMarkerIdx',
      'getMarkerId',
      'getMarkerName',
      'getMarkerLastId'
    ])
  },

  methods: {

    ...mapMutations([
      'execAction',
    ]),

    onPreviousMarker(event) {
      if(this.getMarkerIdx === 0) {
        this.execAction({ action: `SET/POS_STR/m${this.getMarkerLastId}` })
      } else {
        const id = this.getMarkers[this.getMarkerIdx - 1].id
        this.execAction({ action: `SET/POS_STR/m${id}` })
      }
    },

    onNextMarker(event) {
      if(this.getMarkerIdx < this.getMarkers.length - 1) {
        const id = this.getMarkers[this.getMarkerIdx + 1].id
        this.execAction({ action: `SET/POS_STR/m${id}` })
      } else  {
        this.execAction({ action: `SET/POS_STR/m1` })
      }
    },

    onRefresh(event) {
      this.execAction({ action: 'MARKER' })
    },
  },
}
</script>
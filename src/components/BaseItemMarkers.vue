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
      this.execAction({ action: "prev_marker", script_action: true })
    },

    onNextMarker(event) {
      this.execAction({ action: "next_marker", script_action: true })
    },

    onRefresh(event) {
      this.execAction({ action: 'MARKER' })
    },
  },
}
</script>
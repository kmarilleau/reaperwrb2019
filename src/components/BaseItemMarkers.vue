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
        <span v-if="hasMarkers" :style="{ color: item.textcolor }">{{ id }}: {{ name }}</span>
        <span v-if="!hasMarkers" :style="{ color: item.textcolor }">{id}: {Name}</span>
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

  data() {
    return {
      id: '',
      name: '',
      current: 0,
    }
  },

  beforeMount() {
    this.execAction({ action: 'MARKER' })
  },

  computed: {
    ...mapGetters([
      'iconSize',
      'hasMarkers',
      'isAppModeEditor',
      'getMarkers'
    ])
  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onPreviousMarker(event) {
      const markers  = this.getMarkers
      if(markers.length > 0) {
        this.current = this.current - 1 < 0 ? markers.length - 1 : this.current - 1
        this.id = markers[this.current].id
        this.name = markers[this.current].name
        this.execAction({ action: 'SET/POS_STR/m' + this.id })
      }
    },

    onNextMarker(event) {
      const markers  = this.getMarkers
      if(markers.length > 0) {
        this.current = (this.current + 1 === markers.length) ? 0 : this.current + 1
        this.id = markers[this.current].id
        this.name = markers[this.current].name
        this.execAction({ action: 'SET/POS_STR/m' + this.id })
      }
    },

    onRefresh(event) {
      this.execAction({ action: 'MARKER' })
    },
  },
}
</script>
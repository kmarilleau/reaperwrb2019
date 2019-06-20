<template>
  <div class="app-item__track-container" 
    :style="{ color: item.textcolor, 'height': itemHeight + 'px' }"
  >
    <div class="app-item__track-info">
      <span>{{ label }}</span>
    </div>
    <div class="app-item__track-buttons"
      :style="{ 'height': itemHeight + 'px'}"
    >
      <a @click.stop="onNudgeVolDown()" class="app-item__tack-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="volume-decrease" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click.stop="onNudgeVolUp()" class="app-item__tack-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="volume-increase" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click.stop="onMute()" class="app-item__tack-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="mute" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click.stop="onSolo()" class="app-item__tack-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="solo" 
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
    if(this.reaperReady)
      this.execAction({ action: 'TRACK', recur: 500 })
  },

  computed: {
    ...mapGetters([
      'itemHeight',
      'iconSize',
      'reaperReady',
      'getTracks',
      'getTracksSelected',
    ]),

    label() {
      const selected = this.getTracks.filter(track => track.selected).length
      const muted = this.getTracks.filter(track => track.muted).length
      const soloed = this.getTracks.filter(track => track.soloed).length
      return `Selected: ${selected} Mute: ${muted} Solo: ${soloed}`
    },
  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onNudgeVolUp() {
      this.execAction({ action: 40115 })
    },

    onNudgeVolDown() {
      this.execAction({ action: 40116 })
    },

    onMute() {
      this.execAction({ action: 6 })
    },

    onSolo() {
      this.execAction({ action: 7 })
    }
  }
}
</script>
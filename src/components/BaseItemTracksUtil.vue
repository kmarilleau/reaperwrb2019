<template>
  <div class="app-item__tracks-util-container" 
    :style="{ color: item.textcolor, 'height': itemHeight + 'px' }"
  >
    <div class="app-item__tracks-util-info">
      <div>
        <span>SELECTED: {{ selected }}</span>
        <span>MUTED: {{ muted }}</span>
        <span>SOLOED: {{ soloed }}</span>
      </div>
    </div>
    <div class="app-item__tracks-util-buttons"
      :style="{ 'height': itemHeight + 'px'}"
    >
      <a @click="onNudgeVolDown()" class="app-item__tack-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="volume-decrease" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onNudgeVolUp()" class="app-item__tracks-util-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="volume-increase" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onMute()" class="app-item__tracks-util-icon"
      :style="{ 'height': itemHeight + 'px'}"
      >
        <svgicon icon="mute" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onSolo()" class="app-item__tracks-util-icon"
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
    // FIXME always register this action
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

    selected() {
      return this.getTracks.filter(track => track.selected).length
    },

    muted() {
      return this.getTracks.filter(track => track.muted).length
    },

    soloed() {
      return this.getTracks.filter(track => track.soloed).length
    }

  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onNudgeVolUp() {
      this.execAction({ script_action: true, action: "nudge_vol_up" })
    },

    onNudgeVolDown() {
      this.execAction({ script_action: true, action: "nudge_vol_down" })
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
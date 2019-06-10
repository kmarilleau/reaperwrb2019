<template>
  <div :style="{ color: item.textcolor }">
    <div class="app-item__transport-container"
      :style="{ 'height': itemHeight + 'px'}"
    > 

      <a @click="onStop()" class="app-item__transport-icon">
        <svgicon icon="transport-stop" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onPlay()" class="app-item__transport-icon"
        :class="{ blink: transportPlaystatePlay }"
      >
        <svgicon icon="transport-play" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onPause()" class="app-item__transport-icon"
        :class="{ blink: transportPlaystatePause }"
      >
        <svgicon icon="transport-pause" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a @click="onRecord()" class="app-item__transport-icon"
        :class="{ blink: transportPlaystateRecord }"
        :style="{ color: transportPlaystateRecord ? '#F44E3B' : item.textcolor }"
      >
        <svgicon icon="transport-record" 
          :height="iconSize + 'px'"
          :width="iconSize + 'px'"
        />
      </a>

      <a 
        @click="onToggleRepeat()" 
        class="app-item__transport-icon"
        :style="{ color: transportRepeat > 0 ? '#4ef442' : item.textcolor }"
      >
        <svgicon icon="transport-loop" 
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
    if(!this.transportOnline)
      this.execAction({ action: 'TRANSPORT', recur: 20 })
  },

  computed: {
    ...mapGetters([
      'itemHeight',
      'iconSize',
      'transportOnline',
      'transportPlaystate',
      'transportPlaystatePlay',
      'transportPlaystatePause',
      'transportPlaystateRecord',
      'transportRepeat'
    ])
  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onPlay() { this.execAction({ action: 1007 }) },
    onStop() { this.execAction({ action: 1016 }) },
    onPause() { this.execAction({ action: 1008 }) },
    onRecord() { this.execAction({ action: 1013 }) },
    onToggleRepeat() { this.execAction({ action: 'SET/REPEAT/-1' }) },
  },
  
}
</script>
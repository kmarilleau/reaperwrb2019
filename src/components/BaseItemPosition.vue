<template>
  <div class="app-item-position-container" 
    :style="{ color: item.textcolor }"
    @click="onClick()"  
  >
    <div class="app-item-position-mode"><span>{{getMode()}}</span></div>
    <span class="app-item-position-info">{{getPosition()}}</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const modes = ['AUTO', 'BEAT', 'SEC']

export default {
  props: ['item', 'transport'],

  data() {
    return {
      mode: 0
    }
  },

  beforeMount() {
    if(!this.transportOnline) 
      this.execAction({ action: 'TRANSPORT', recur: 20 })
  },

  computed: {
    ...mapGetters([
      'transportOnline',
      'reaperReady',
      'transportPosString',
      'transportPosBeats',
      'transportPosSec',
      'transportPosString'
    ])
  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onClick(event) {
      this.mode = (this.mode+1) % 3
    },

    getMode() {
      return modes[this.mode]
    },

    getPosition() {
      if(!this.reaperReady) {
        return '0.0.00'
      } else {
        switch(modes[this.mode]) {
          case 'AUTO':
            return this.transportPosString 
            break
          case 'BEAT':
            return this.transportPosBeats
            break
          case 'SEC':
            return this.transportPosSec
            break
          default:
            return this.transportPosString
            break
        }
      }
    }

  }
}
</script>
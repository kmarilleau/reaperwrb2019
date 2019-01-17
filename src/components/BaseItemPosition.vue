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

const modes = ['AUTO', 'BEAT', 'SEC']

export default {
  props: ['item', 'transport'],

  data() {
    return {
      mode: 0,
    }
  },

  beforeMount() {
    if(!this.$store.getters.transportOnline) 
      this.$store.commit('execAction', { action: 'TRANSPORT', recur: 20 })
  },

  methods: {

    onClick(event) {
      this.mode = (this.mode+1) % 3
    },

    getMode() {
      return modes[this.mode]
    },

    getPosition() {
      if(!this.$store.getters.reaperReady) {
        return '0.0.00'
      } else {
        switch(modes[this.mode]) {
          case 'AUTO':
            return this.$store.getters.transportPosString
            break
          case 'BEAT':
            return this.$store.getters.transportPosBeats
            break
          case 'SEC':
            return this.$store.getters.transportPosSec
            break
          default:
            return this.$store.getters.transportPosString
            break
        }
      }
    }

  }
}
</script>

<style scoped>
</style>
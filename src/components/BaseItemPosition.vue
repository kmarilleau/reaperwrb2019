<template>
  <div class="app-item-position-container" 
    :style="{ color: item.textcolor }"
    @click="onClick()"  
  >
    <span class="app-item-position-mode">{{getMode()}}</span>
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
    if(!this.$store.state.reaper.transport.online) 
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
      if(!this.$store.state.reaper.ready) {
        return '0.0.00'
      } else {
        switch(modes[this.mode]) {
          case 'AUTO':
            return this.$store.state.reaper.transport.position_string
            break
          case 'BEAT':
            return this.$store.state.reaper.transport.position_string_beats
            break
          case 'SEC':
            return this.$store.state.reaper.transport.position_seconds
            break
          default:
            return this.$store.state.reaper.transport.position_string
            break
        }
      }
    }

  }
}
</script>

<style scoped>
</style>
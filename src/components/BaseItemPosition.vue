<template>
  <div class="app-item-position-info" 
    :style="{ color: item.textcolor }"
    @click="onClick()"  
  >
    <span>{{transport.position_string}}</span>
  </div>
</template>

<script>
export default {
  props: ['item', 'transport'],

  beforeMount() {
    // FIXME only do this once!
    this.$store.commit('execAction', { action: 'TRANSPORT', recur: 20 })
  },

  beforeDestroy() {
    this.$store.commit('cancelAction', { action: 'TRANSPORT' })
  },

  methods: {
    onClick(event) {
      console.log("POSITION CYCLE MODE")
    }
  }
}
</script>

<style scoped>

</style>
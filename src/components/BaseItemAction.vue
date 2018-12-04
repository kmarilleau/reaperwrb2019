<template>
  <a @click="onClick" class="app-item-action-container">

    <div class="app-item-action-icon">
      <font-awesome-icon 
        v-if="item.icon"
        :icon="item.icon" size="5x"
        :style="{ color: item.textcolor }" 
      />
    </div>

    <div class="app-item-label"
      :style="{ color: item.textcolor }"
      :class="labelClass"
    >
      <span>{{item.label}}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ['item'],

  methods: {
    onClick: function() {
      if(this.$store.state.reaper.ready) {
        console.log("ReaperWRB: Trigger Action: %s", this.item.label)
        wwr_req(this.item.action)
      }
    }
  },

  computed: {
    labelClass: function() {
      // FIXME needs testing
      let classes = []

      if(!this.item.icon)
        classes.push('app-item-noicon')

      // FIXME check string length

    },
  },
}
</script>

<style scoped>
</style>
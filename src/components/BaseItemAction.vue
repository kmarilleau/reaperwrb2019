<template>
  <a class="app-item-action-container"
    @click="onClick"
  >

    <div class="app-item-action-icon">
      <font-awesome-icon 
        v-if="item.icon"
        :icon="itemIcon()" size="5x"
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
    onClick() {
      if(this.item.toggle) {
        this.item.toggled = this.item.toggled ? false : true
      }
      if(this.$store.state.reaper.ready) {
        wwr_req(this.item.action)
      }
    },

    itemIcon() {
      if(!this.item.toggle)
        return this.item.icon
      else 
        return this.item.toggled && this.item.toggleicon ? this.item.toggleicon : this.item.icon
    },
  },

  computed: {
    labelClass() {
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
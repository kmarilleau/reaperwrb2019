<template>
  <a class="app-item-action-container">
    <div class="app-item-action-icon">
      <font-awesome-icon 
        v-if="item.toggleicon"
        :icon="item.toggleicon" size="5x"
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

  computed: {
    labelClass: function() {
      // FIXME needs testing
      if(!this.item.icon)
        return 'app-item-noicon'
    },
  },
}
</script>

<style scoped>
</style>
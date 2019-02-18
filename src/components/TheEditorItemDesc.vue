<template>
  <div class="app-editor-item-desc-container"
    v-if="this.$store.getters.editItemHasKey('desc') 
    && this.$store.getters.editItemKey('desc', false) !== false"
  >
    <label>Action Description</label>
    <div class="app-item-desc">
      <div>{{itemDesc}}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    itemDesc() {
      return this.$store.getters.editItemKey('desc', '')
    },
  }
}
</script>
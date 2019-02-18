<template>
  <div class="app-editor-input-toggle-container"
    v-if="this.$store.getters.editItemHasKey('toggle')"
  >
    <label>Toggle</label>
    <input 
      type="checkbox" name="item-toggle" class="app-editor-checkbox" 
      v-model="itemToggle"
    >
  </div>
</template>

<script>
export default {
  computed: {
    itemToggle: {
      get() {
        return this.$store.getters.editItemKey('toggle', false)
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'toggle', val: value })
      }
    },
  },
}
</script>
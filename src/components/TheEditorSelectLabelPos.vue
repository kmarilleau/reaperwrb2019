<template>
  <div class="app-editor-select-labelpos-container"
    v-if="this.$store.getters.editItemKey('icon', false) 
    && this.$store.getters.editItemHasKey('labelpos')"
  >
    <label>Label Position</label>
    <select v-model="itemLabelPos">
      <option value="0">bottom</option>
      <option value="1">top</option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    itemLabelPos: {
      get() {
        return this.$store.getters.editItemKey('labelpos', 0)
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'labelpos', val: value })
      }
    },
  }
}
</script>
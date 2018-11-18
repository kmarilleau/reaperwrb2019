<template>
  <div id="app-item-delete-dialog" 
  v-if="this.$store.state.editor.delete_dialog"
  :class="{ hidden: !this.$store.state.editor.delete_dialog }">
    <div>
      <h1>Permanently Delete Item?</h1>

      <button
        @click.stop="onDelete(false)"
      ><font-awesome-icon icon="trash" size="1x"></font-awesome-icon> Delete</button>

      <button
        v-if="this.$store.state.delete_item.data.type === 'tab' || this.$store.state.delete_item.data.type === 'row'"
        @click.stop="onDelete(true)"
      ><font-awesome-icon icon="trash" size="1x"></font-awesome-icon> Keep Items</button>

      <button
        @click.stop="onCancel"
      ><font-awesome-icon icon="ban" size="1x"></font-awesome-icon> Cancel</button>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onDelete: function(keepItems) {
      this.$store.commit('delete_item', keepItems)
    },
    onCancel: function(event) {
      this.$store.commit('cancel_delete')
    }
  }
}
</script>

<style scoped>
#app-item-delete-dialog {
  background: #121212;
  position: absolute;
  top: 0;
  left: 1024px;
  right: 0;
  bottom: 0;
  width: inherit;
  z-index: 1000;
  text-align: center;
}

button { width: 25%; line-height: 100px; font-size: 150%; }
</style>
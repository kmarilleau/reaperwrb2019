<template>
  <div id="app-item-delete-dialog" 
  v-if="this.$store.state.editor.delete_dialog"
  :class="{ hidden: !this.$store.state.editor.delete_dialog }">
    <div>
      <h1>Permanently Delete?</h1>

      <button
        @click.stop="onDelete(false)"
      ><font-awesome-icon icon="trash" size="1x" /> Delete</button>

      <button
        v-if="showKeepItems()"
        @click.stop="onDelete(true)">
        <font-awesome-icon icon="trash" size="1x" /> Keep Items
      </button>

      <button
        @click.stop="onCancel"
      ><font-awesome-icon icon="ban" size="1x" /> Cancel</button>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showKeepItems() {
      switch(this.$store.state.delete_item.data.type) {
        case 'tab':
          // should never be triggered because we can't delete the last row
          return this.$store.state.tabs[this.$store.state.active_tab].rows.length > 0 ? true : false
        case 'row':
          return this.$store.state.tabs[this.$store.state.active_tab].rows[this.$store.state.delete_item.row].length > 0 ? true : false
        default:
          return false
      }
    },
    onDelete(keepItems) {
      this.$store.commit('delete_item', keepItems)
    },
    onCancel(event) {
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
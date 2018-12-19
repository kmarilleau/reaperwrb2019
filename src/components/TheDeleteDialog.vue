<template>
  <div id="app-item-delete-dialog" 
  v-if="this.$store.state.editor.delete_dialog"
  :class="{ hidden: !this.$store.state.editor.delete_dialog }">
    <div>
      <div class="app-editor-dialog-info">Permanently Delete?</div>

      <button class="pure-button"
        @click.stop="onCancel"
      ><font-awesome-icon icon="ban" size="1x" /> Cancel</button>

      <button class="pure-button"
        v-if="showKeepItems()"
        @click.stop="onDelete(true)">
        <font-awesome-icon icon="trash" size="1x" /> Keep Items
      </button>

      <button class="pure-button"
        @click.stop="onDelete(false)"
      ><font-awesome-icon icon="trash" size="1x" /> Delete</button>

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
</style>
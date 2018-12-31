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

      if(this.$store.state.editor.bulk_edit)
        return false

      const active_tab = this.$store.state.active_tab
      const row = this.$store.state.editor.delete_item.row
      
      switch(this.$store.state.editor.delete_item.data.type) {
        case 'tab':
          // should never be triggered because we can't delete the last row
          return this.$store.state.tabs[active_tab].rows.length > 0 ? true : false
        case 'row':
          return this.$store.state.tabs[active_tab].rows[row].length > 0 ? true : false
        default:
          return false
      }
    },
    onDelete(keepItems) {
      if(this.$store.state.editor.bulk_edit)
        this.$store.commit('bulkDelete')
      else
        this.$store.commit('delete', keepItems)
    },
    onCancel(event) {
      if(this.$store.state.editor.bulk_edit)
        this.$store.commit('cancelBulkDelete')
      else
        this.$store.commit('cancelDelete')
    }
  }
}
</script>

<style scoped>
</style>
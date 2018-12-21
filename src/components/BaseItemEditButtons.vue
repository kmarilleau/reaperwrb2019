<template>
    <div class="app-item-edit-buttons"
      v-if="this.$store.state.editor.enabled"
      :class="{ hidden: this.$store.state.editor.bulk_edit ? 0 : this.$store.state.editor.delete_dialog }"
    >
      <template 
        v-if="!this.$store.state.editor.bulk_edit"
      >
        <a class="app-item-edit-button" @click.stop="onItemEdit"><font-awesome-icon icon="pen" size="1x" /></a>
        <a class="app-item-edit-button" @click.stop="onItemDelete"><font-awesome-icon icon="trash" size="1x" /></a>
      </template>

      <template v-if="this.$store.state.editor.bulk_edit">
        <input @change="onItemBulkEdit($event)" class="app-editor-checkbox" type="checkbox" />
      </template>
    </div>
</template>

<script>
export default {
  props: ['row', 'item', 'index'],

  methods: {

    onItemEdit(event) {
      let data = {
        item: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.commit('clearEditHighlight')
      this.$store.commit('edit', data)
    },

    onItemBulkEdit(event) {
      let commit = {
        item: this.item,
        row: this.row,
        index: this.index
      }

      this.$store.commit('clearEditHighlight')
      event.target.checked ? 
        this.$store.commit('bulkEditAdd', commit) : this.$store.commit('bulkEditRemove', commit)
    },
    
    onItemDelete(event) {
      let commit = {
        data: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.commit('clearEditHighlight')
      this.$store.commit('showDeleteDialog', commit)
    }
  }
}
</script>

<style>
</style>
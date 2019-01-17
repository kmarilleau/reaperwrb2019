<template>
    <div class="app-item-edit-buttons">
      <template 
        v-if="!this.$store.state.editor.bulk_edit"
      >
        <a class="app-item-edit-button" @click.stop="onItemEdit">
          <font-awesome-icon icon="pen" size="1x" />
        </a>
        
        <a class="app-item-edit-button"
          v-if="item.type === 'tab' && this.$store.state.webremote.tabs.length === 1 ? false : true" 
          @click.stop="onItemDelete">
          <font-awesome-icon icon="trash" size="1x" />
        </a>
      </template>

      <template v-if="this.$store.state.editor.bulk_edit">
        <input @change="onItemBulkEdit($event)" class="app-editor-checkbox" type="checkbox">
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
        index: this.index,
        el: this.$parent.$el
      }

      //this.$store.commit('clearEditHighlight')
      if(event.target.checked) {
        this.$parent.$el.classList.add('app-highlight-edit')
        this.$store.commit('bulkEditAdd', commit)
      } else {
        this.$parent.$el.classList.remove('app-highlight-edit')
        this.$store.commit('bulkEditRemove', commit)
      }
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
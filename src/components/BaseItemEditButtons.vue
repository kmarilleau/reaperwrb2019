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

    onItemEdit: function(event) {
      let commit = {
        data: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.commit('edit_item', commit)
    },

    onItemBulkEdit: function(event) {
      let commit = {
        item: this.item,
        row: this.row,
        index: this.index
      }

      event.target.checked ? 
        this.$store.commit('bulk_edit_add', commit) : this.$store.commit('bulk_edit_remove', commit)
    },
    
    onItemDelete: function(event) {
      // FIXME ask for confirmation
      let commit = {
        data: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.commit('show_delete_dialog', commit)
    }
  }
}
</script>

<style >
.app-item-edit-buttons {
  position: relative;
  height: 0;
  display: flex;
  line-height: 30px;
  flex-direction: row;
  justify-content: flex-end;
}

a.app-item-edit-button {
  background: #424242;
  opacity: 0.5;
  display: inline-block;
  height: 30px; 
  width: 30px;
  text-align: center;
  z-index: 1000;
  visibility: hidden;
}
.app-item:hover .app-item-edit-button,
.app-tab-navigation-item:hover .app-item-edit-button {
  visibility: visible;
}
.app-item-edit-button:hover {
  opacity: 1;
}
</style>
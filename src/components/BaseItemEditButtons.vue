<template>
    <div class="app-item-edit-buttons"
      :class="{ hidden: this.$store.state.editor.delete_dialog }"
    >
      <a class="app-item-edit-button" @click.stop="onItemEdit"><font-awesome-icon icon="pen" size="1x" /></a>
      <a class="app-item-edit-button" @click.stop="onItemDelete"><font-awesome-icon icon="trash" size="1x" /></a>
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
  text-align: right;
  line-height: 30px;
  visibility: hidden;
  height: 0px;
}
a.app-item-edit-button {
  opacity: 0.5;
  display: inline-block;
  height: 30px; 
  width: 30px;
  text-align: center;
  z-index: 100;
}
.app-item:hover .app-item-edit-buttons,
.app-tab-navigation-item:hover .app-item-edit-buttons {
  visibility: visible;
}
.app-item-edit-button:hover {
  opacity: 1;
}
</style>
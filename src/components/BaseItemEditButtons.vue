<template>
    <div class="app-item-edit-buttons"
      v-if="this.$store.getters.showEditorEditButtons"
    >
      <template 
        v-if="!this.$store.getters.isEditorBulkEdit"
      >
        <a class="app-item-edit-button" 
          @click.stop="onItemEdit"
        >
          <span><font-awesome-icon icon="pen" size="1x" /></span>
        </a>
        
        <a class="app-item-edit-button"
          v-if="!this.$store.getters.isLastTab(item)" 
          @click.stop="onItemDelete">
          <span><font-awesome-icon icon="trash" size="1x" /></span>
        </a>
      </template>

      <template v-if="item.type !== 'tab' && this.$store.getters.isEditorBulkEdit">
        <input @change="onItemBulkEdit($event)" class="app-editor-checkbox" type="checkbox">
      </template>
    </div>
</template>

<script>
export default {
  props: ['row', 'item', 'index'],

  methods: {

    onItemEdit(event) {
      let payload = {
        item: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.dispatch('onItemEdit', payload)
    },

    onItemBulkEdit(event) {
      let payload = {
        item: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }

      if(event.target.checked) {
        this.$parent.$el.classList.add('app-highlight-edit')
        this.$store.commit('bulkEditAdd', payload)
      } else {
        this.$parent.$el.classList.remove('app-highlight-edit')
        this.$store.commit('bulkEditRemove', payload)
      }
    },
    
    onItemDelete(event) {
      let payload = {
        data: this.item,
        row: this.row,
        index: this.index,
        el: this.$parent.$el
      }
      this.$store.dispatch('onItemDelete', payload)
    }
  }
}
</script>

<style>
</style>
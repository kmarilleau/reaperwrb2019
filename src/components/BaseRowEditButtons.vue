<template>
  <div class="app-row-edit-buttons"
    v-if="this.$store.state.editor.enabled 
    && this.$store.state.editor.menu === false
    && !this.$store.state.editor.bulk_edit" 
    :class="{ hidden: this.$store.state.editor.delete_dialog }"
  >
    <a @click.stop="onAddItem()" class="app-row-edit-button">
      <font-awesome-icon icon="plus" size="1x" />
      <span>Item</span>
    </a>
    <a @click.stop="onAddRow()" class="app-row-edit-button">
      <font-awesome-icon icon="plus" size="1x" />
      <span>Row</span>
    </a>
    <a @click.stop="onDeleteRow()" class="app-row-edit-button"
      v-if="this.$store.state.tabs[this.$store.state.active_tab].rows.length > 1"
    >
      <font-awesome-icon icon="trash" size="1x" />
      <span>Row</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['row'],

  methods: {
    onAddItem(event) {
      this.$store.commit('switch_row', this.row)
      this.$store.commit('show_editor')
      this.$store.commit('show_menu')
    },

    onAddRow(event) {
      this.$store.commit('add_row', this.row)
    },

    onDeleteRow(event) {
      let commit = {
        data: {
          type: 'row',
        },
        row: this.row,
        index: this.index,
        el: this.$parent.$children[0].$el
      }
      this.$store.commit('show_delete_dialog', commit)
    }
  }
}
</script>

<style scoped>
</style>
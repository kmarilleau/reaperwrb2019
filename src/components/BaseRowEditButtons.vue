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

  // FIXME works only once
  mounted() {
    const self = this
    this.$el.addEventListener('mouseover', function() {
      self.$parent.$el.style.backgroundColor = '#121212'
    })
    this.$el.addEventListener('mouseout', function() {
      self.$parent.$el.style.backgroundColor = ''
    })
  },

  methods: {
    onAddItem(event) {
      this.$parent.$el.style.backgroundColor = ''
      this.$store.commit('clearEditHighlight')
      this.$store.commit('switchRow', this.row)
      this.$store.commit('showEditor')
      this.$store.commit('showItemMenu')
    },

    onAddRow(event) {
      this.$store.commit('addRow', this.row)
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
      this.$store.commit('clearEditHighlight')
      this.$store.commit('showDeleteDialog', commit)
    }
  }
}
</script>

<style scoped>
</style>
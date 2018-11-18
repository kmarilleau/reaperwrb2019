<template>
  <div class="app-row-edit-buttons">
    <a @click.stop="onAddItem()" class="app-row-edit-button">
      <font-awesome-icon icon="plus" size="1x" />
      <span>Item</span>
    </a>
    <a @click.stop="onAddRow()" class="app-row-edit-button">
      <font-awesome-icon icon="plus" size="1x" />
      <span>Row</span>
    </a>
    <a @click.stop="onDeleteRow()" class="app-row-edit-button">
      <font-awesome-icon icon="trash" size="1x" />
      <span>Row</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['row'],

  methods: {
    onAddItem: function(event) {
      this.$store.commit('switch_row', this.row)
      this.$store.commit('show_editor')
      this.$store.commit('show_menu')
    },

    onAddRow: function(event) {
      this.$store.commit('add_row', this.row)
    },

    onDeleteRow: function(event) {
      this.$store.commit('delete_row', this.row)
    }
  }
}
</script>

<style scoped>
</style>
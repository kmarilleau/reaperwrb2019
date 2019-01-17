<template>
  <div class="app-row-edit-buttons">
    <a class="app-row-edit-button"
      @click.stop="onShowItemAddMenu()" 
    >
      <font-awesome-icon icon="plus" size="1x" />
      <span>Item</span>
    </a>
    <a class="app-row-edit-button"
      @click.stop="onRowAdd()" 
    >
      <font-awesome-icon icon="plus" size="1x" />
      <span>Row</span>
    </a>
    <a class="app-row-edit-button"
      @click.stop="onRowDelete()" 
      v-if="this.$store.getters.showDeleteRowButton"
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
    onShowItemAddMenu(event) {
      this.$store.dispatch('onShowItemAddMenu', this.row)
    },

    onRowAdd(event) {
      this.$store.commit('addRow', this.row)
    },

    onRowDelete(event) {
      let payload = {
        data: {
          type: 'row',
        },
        row: this.row,
        index: this.index,
        el: this.$parent.$children[0].$el
      }
      this.$store.dispatch('onItemDelete', payload)
    }
  }
}
</script>

<style scoped>
</style>
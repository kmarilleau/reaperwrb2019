<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeDelete"
  >
    <button title="cancel" class="pure-button pure-button-secondary app-editor-button" style="grid-column: span 2;"
      @click.stop="onCancel"
    >
      <font-awesome-icon icon="ban" /> Cancel
    </button>

    <template 
      v-if="!this.$store.getters.isEditorBulkEdit"
    >
      <button title="keep items" class="pure-button app-editor-button" style="grid-column: span 2;"
        v-if="this.$store.getters.deleteCanKeepItems"
        @click.stop="onDelete(true)">
        <font-awesome-icon icon="recycle" /> Keep
      </button>
    </template>
    
    <button title="delete" class="pure-button pure-button-warning app-editor-button" style="grid-column: span 2;"
      @click.stop="onDelete(false)"
    >
      <font-awesome-icon icon="trash" /> Confirm
    </button>

  </div>
</template>

<script>
export default {
  methods: {
    onDelete(keepItems) {
      if(this.$store.getters.isEditorBulkEdit)
        this.$store.commit('bulkDelete')
      else
        this.$store.commit('delete', keepItems)

      this.$store.commit('clearEditHighlight')
    },
    
    onCancel(event) {
      if(this.$store.getters.isEditorBulkEdit)
        this.$store.commit('cancelBulkDelete')
      else
        this.$store.commit('cancelDelete')
    }
  }
}
</script>

<style scoped>
</style>
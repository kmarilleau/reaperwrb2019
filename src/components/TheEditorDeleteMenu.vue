<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeDelete"
  >
    <button title="cancel" class="pure-button pure-button-secondary"
      @click.stop="onCancel"
    >
      <svgicon icon="blocked" /> Cancel
    </button>

    <template 
      v-if="!this.$store.getters.isEditorBulkEdit"
    >
      <button title="keep items" class="pure-button"
        v-if="this.$store.getters.deleteCanKeepItems"
        @click.stop="onDelete(true)">
        <svgicon icon="sync" /> Keep
      </button>
    </template>
    
    <button title="delete" class="pure-button pure-button-warning"
      @click.stop="onDelete(false)"
    >
      <svgicon icon="edit-delete-forever" /> Confirm
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
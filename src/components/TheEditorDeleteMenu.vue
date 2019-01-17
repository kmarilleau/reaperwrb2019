<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeDelete"
  >
    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel"
    >
      <font-awesome-icon icon="ban" size="1x" /> Cancel
    </button>

    <template 
      v-if="!this.$store.getters.isEditorBulkEdit"
    >
      <button class="pure-button"
        v-if="this.$store.getters.deleteCanKeepItems"
        @click.stop="onDelete(true)">
        <font-awesome-icon icon="trash" size="1x" /> Keep Items
      </button>
    </template>
    
    <button class="pure-button pure-button-warning"
      @click.stop="onDelete(false)"
    >
      <font-awesome-icon icon="trash" size="1x" /> Delete
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
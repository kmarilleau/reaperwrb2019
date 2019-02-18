<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeDelete"
  >

    <app-editor-button label="Cancel" icon="blocked" class="pure-button-secondary" 
      @click.native.stop="onCancel" c
    />

    <app-editor-button label="Keep" icon="sync" 
      v-if="!this.$store.getters.isEditorBulkEdit && this.$store.getters.deleteCanKeepItems"
      @click.native.stop="onDelete(true)" 
    />

    <app-editor-button label="Confirm" icon="edit-delete-forever" class="pure-button-warning" 
      @click.native.stop="onDelete(false)" 
    />

    <div class="app-editor-menu-help">
      <template
        v-if="!this.$store.getters.isEditorBulkEdit && this.$store.getters.deleteCanKeepItems"
      >
        <label><svgicon icon="sync" /> Keep</label>
        <p>Items will be moved to next row/tab</p>
      </template>
      <label><svgicon icon="edit-delete-forever" /> Confirm</label>
      <p>Items will be deleted forever. This can't be undone!</p>
    </div>

  </div>
</template>

<script>
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {

  components: {
    'app-editor-button': BaseEditorButton
  },

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
<template>
  <div class="app-editor__menu"
    v-if="isEditorModeDelete"
  >

    <app-editor-button label="Cancel" icon="blocked" class="pure-button-secondary" 
      @click.native.stop="onCancel" c
    />

    <app-editor-button label="Keep" icon="sync" 
      v-if="!isEditorBulkEdit && deleteCanKeepItems"
      @click.native.stop="onDelete(true)" 
    />

    <app-editor-button label="Confirm" icon="edit-delete-forever" class="pure-button-warning" 
      @click.native.stop="onDelete(false)" 
    />

    <div class="app-editor__menu-help">
      <template
        v-if="!isEditorBulkEdit && deleteCanKeepItems"
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
import { mapGetters, mapMutations } from 'vuex'
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {

  components: {
    'app-editor-button': BaseEditorButton
  },

  computed: {
    ...mapGetters([
      'isEditorModeDelete',
      'isEditorBulkEdit',
      'deleteCanKeepItems',
    ])
  },

  methods: {

    ...mapMutations([
      'bulkDelete',
      'delete',
      'clearEditHighlight',
      'cancelBulkDelete',
      'cancelDelete'
    ]),

    onDelete(keepItems) {
      if(this.isEditorBulkEdit)
        this.bulkDelete()
      else
        this.delete(keepItems)

      this.clearEditHighlight()
    },
    
    onCancel(event) {
      if(this.isEditorBulkEdit)
        this.cancelBulkDelete()
      else
        this.cancelDelete()
    }
  }
}
</script>
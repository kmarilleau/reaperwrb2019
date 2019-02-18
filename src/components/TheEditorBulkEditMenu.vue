<template>
  <div class="app-editor-panel app-editor-menu app-editor-bulk-menu"
    v-if="this.$store.getters.showEditorBulkEditButtons"
    :class="{ blur: this.$store.state.editor.help }"
  >
    <app-editor-button label="Clear Icon(s)" icon="minus-circle-filled" class="pure-button-secondary"
      @click.native="onBulkClearIcons"
    />

    <app-editor-button label="Delete Selected" icon="edit-delete" class="pure-button-warning"
      @click.native="onBulkDeleteItems"
    />
  </div>

</template>

<script>
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {
  components: {
    'app-editor-button': BaseEditorButton
  },

  methods: {
    onBulkClearIcons(event) {
      this.$store.commit('updateItems', { key: 'icon', val: false })
      this.$store.commit('updateItems', { key: 'toggleicon', val: false })
    },

    onBulkDeleteItems(event) {
      this.$store.commit('showBulkDeleteDialog')
    },
  }
}
</script>
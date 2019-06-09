<template>
  <div class="app-editor-panel app-editor-menu app-editor-bulk-menu"
    v-if="showEditorBulkEditButtons"
    :class="{ blur: showHelp }"
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
import { mapGetters, mapMutations } from 'vuex'
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {
  components: {
    'app-editor-button': BaseEditorButton
  },

  computed: {
    ...mapGetters([
      'showEditorBulkEditButtons',
      'showHelp'
    ])
  },

  methods: {

    ...mapMutations([
      'updateItems',
      'showBulkDeleteDialog'
    ]),

    onBulkClearIcons(event) {
      this.updateItems({ key: 'icon', val: false })
      this.updateItems({ key: 'toggleicon', val: false })
    },

    onBulkDeleteItems(event) {
      this.showBulkDeleteDialog()
    },
  }
}
</script>
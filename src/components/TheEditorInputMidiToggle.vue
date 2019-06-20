<template>
  <div class="app-editor-input-toggle-container"
    v-if="editItemType('action')"
  >
    <label>Midi Editor</label>
    <input 
      type="checkbox" name="item-midi-action" class="app-editor-checkbox" 
      v-model="itemMidiEditor"
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {

    ...mapGetters([
      'editItemType',
      'editItemKey',
    ]),

    itemMidiEditor: {
      get() {
        return this.editItemKey('midi_editor', false)
      },
      set(value) {
        this.updateItem({ key: 'midi_editor', val: value })
      }
    },
  },

  methods: {
    ...mapMutations([
      'updateItem'
    ])
  }
}
</script>
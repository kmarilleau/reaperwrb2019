<template>
  <div class="app-editor-input-toggle-container"
    v-if="editItemHasKey('toggle')"
  >
    <label>Toggle</label>
    <input 
      type="checkbox" name="item-toggle" class="app-editor-checkbox" 
      v-model="itemToggle"
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {

    ...mapGetters([
      'editItemHasKey',
      'editItemKey'
    ]),

    itemToggle: {
      get() {
        return this.editItemKey('toggle', false)
      },
      set(value) {
        this.updateItem({ key: 'toggle', val: value })
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
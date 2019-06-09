<template>
  <div class="app-editor-select-labelpos-container"
    v-if="editItemKey('icon', false) && editItemHasKey('labelpos')"
  >
    <label>Label Position</label>
    <select v-model="itemLabelPos">
      <option value="0">bottom</option>
      <option value="1">top</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {

    ...mapGetters([
      'editItemKey',
      'editItemHasKey'
    ]),

    itemLabelPos: {
      get() {
        return this.editItemKey('labelpos', 0)
      },
      set(value) {
        this.updateItem({ key: 'labelpos', val: value })
      }
    },
  },

  methods: {
    ...mapMutations([
      'updateItem'
    ])
  },
}
</script>
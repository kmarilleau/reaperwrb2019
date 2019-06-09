<template>
  <div class="app-editor-input-label-container"
    v-if="editItemHasKey('label')"
  >
    <label>Label</label>
    <input 
      type="text" name="item-label" id="item-label" 
      v-model="itemLabel" maxlength="30" autofocus 
      @keyup.enter="onKeyupEnter($event)"
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

    itemLabel: {
      get() {
        return this.editItemKey('label', '')
      },
      set(value) {
        this.updateItem({ key: 'label', val: value })
      }
    },
  },

  methods: {

    ...mapMutations([
      'updateItem'
    ]),

    onKeyupEnter(event) {
      event.target.blur()
    }
  }
}
</script>
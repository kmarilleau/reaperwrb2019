<template>
  <div class="app-editor-input-label-container"
    v-if="this.$store.getters.editItemHasKey('label')"
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
export default {

  computed: {
    itemLabel: {
      get() {
        return this.$store.getters.editItemKey('label', '')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'label', val: value })
      }
    },
  },

  methods: {
    onKeyupEnter(event) {
      event.target.blur()
    }
  }
}
</script>
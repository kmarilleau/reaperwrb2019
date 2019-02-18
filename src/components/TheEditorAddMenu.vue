<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary" style="grid-column: span 2;"
      @click.stop="onCancel">
      <svgicon icon="blocked" /> Cancel
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onItemAdd('action')" class="pure-button app-editor-button-add">
      Action
    </button>
    <button @click.stop="onItemAdd('spacer')" class="pure-button app-editor-button-add">
      Spacer
    </button>
    <button @click.stop="onItemAdd('transport')" class="pure-button app-editor-button-add">
      Transport
    </button>
    <button @click.stop="onItemAdd('position')" class="pure-button app-editor-button-add">
      Position
    </button>
    <button @click.stop="onItemAdd('markers')" class="pure-button app-editor-button-add">
      Markers
    </button>
    <button @click.stop="onItemAdd('regions')"  class="pure-button app-editor-button-add">
      Regions
    </button>
    
  </div>
</template>

<script>
export default {
  methods: {
    onItemAdd(type) {
      this.$store.dispatch('onItemAdd', type)
    },
    onCancel() {
      this.$store.commit('setEditorModeMain')
    },
  }
}
</script>

<style scoped>
</style>
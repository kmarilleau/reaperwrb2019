<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary app-editor-button"
      @click.stop="onCancel">
      <font-awesome-icon icon="ban" />
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onItemAdd('action')" class="pure-button app-editor-button app-editor-add-button">
      Action
    </button>
    <button @click.stop="onItemAdd('spacer')" class="pure-button app-editor-button app-editor-add-button">
      Spacer
    </button>
    <button @click.stop="onItemAdd('transport')" class="pure-button app-editor-button app-editor-add-button">
      Transport
    </button>
    <button @click.stop="onItemAdd('position')" class="pure-button app-editor-button app-editor-add-button">
      Position
    </button>
    <button @click.stop="onItemAdd('markers')" class="pure-button app-editor-button app-editor-add-button">
      Markers
    </button>
    <button @click.stop="onItemAdd('regions')"  class="pure-button app-editor-button app-editor-add-button">
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
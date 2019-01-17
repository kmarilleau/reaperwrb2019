<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <font-awesome-icon icon="ban" /> Cancel
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onAdd('action')" class="pure-button">
      <font-awesome-icon icon="plus" /> Action
    </button>
    <button @click.stop="onAdd('spacer')" class="pure-button">
      <font-awesome-icon icon="plus" /> Spacer
    </button>
    <button @click.stop="onAdd('transport')" class="pure-button">
      <font-awesome-icon icon="plus" /> Transport
    </button>
    <button @click.stop="onAdd('position')" class="pure-button">
      <font-awesome-icon icon="plus" /> Position
    </button>
    <button @click.stop="onAdd('markers')" class="pure-button">
      <font-awesome-icon icon="plus" /> Markers
    </button>
    <button @click.stop="onAdd('regions')"  class="pure-button">
      <font-awesome-icon icon="plus" /> Regions
    </button>
    
  </div>
</template>

<script>
export default {
  methods: {
    onAdd(type) {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('addItem', type)
    },
    onCancel() {
      this.$store.commit('setEditorModeMain')
    },
  }
}
</script>

<style scoped>
</style>
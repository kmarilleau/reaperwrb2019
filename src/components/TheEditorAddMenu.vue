<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <font-awesome-icon icon="ban" /> Cancel
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onItemAdd('action')" class="pure-button">
      <font-awesome-icon icon="plus" /> Action
    </button>
    <button @click.stop="onItemAdd('spacer')" class="pure-button">
      <font-awesome-icon icon="plus" /> Spacer
    </button>
    <button @click.stop="onItemAdd('transport')" class="pure-button">
      <font-awesome-icon icon="plus" /> Transport
    </button>
    <button @click.stop="onItemAdd('position')" class="pure-button">
      <font-awesome-icon icon="plus" /> Position
    </button>
    <button @click.stop="onItemAdd('markers')" class="pure-button">
      <font-awesome-icon icon="plus" /> Markers
    </button>
    <button @click.stop="onItemAdd('regions')"  class="pure-button">
      <font-awesome-icon icon="plus" /> Regions
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
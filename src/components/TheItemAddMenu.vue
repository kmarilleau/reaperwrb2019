<template>
  <div id="app-item-add-menu" :class="{ hidden: !this.$store.state.editor.menu }">
    <button class="pure-button" style="grid-column-end: 6 span;" @click.stop="onCancel()">
      <font-awesome-icon icon="ban" size="1x" /> Cancel
    </button>
    <div class="app-item-add-menu-items">
      <a @click.stop="onAdd('action')" class="font-l"><span>Action</span></a>
      <a @click.stop="onAdd('spacer')" class="font-l"><span>Spacer</span></a>
      <a @click.stop="onAdd('transport')" class="font-l"><span>Transport</span></a>
      <a @click.stop="onAdd('position')" class="font-l"><span>Position</span></a>
      <a @click.stop="onAdd('markers')" class="font-l"><span>Markers</span></a>
      <a @click.stop="onAdd('regions')" class="font-l"><span>Regions</span></a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onAdd(type) {
      document.querySelector('#app-item-add-menu').classList.add('hidden')
      this.$store.commit('addItem', type)
      this.$store.commit('clearEditHighlight')
    },
    onCancel(event) {
      this.$store.commit('cancelAddItem')
    }
  }
}
</script>

<style scoped>
</style>
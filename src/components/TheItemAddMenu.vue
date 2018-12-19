<template>
  <div id="app-item-add-menu" :class="{ hidden: !this.$store.state.editor.menu }">
    <button style="grid-column-end: 6 span;" @click.stop="onCancel()"><font-awesome-icon icon="ban" size="1x" /> Cancel</button>
    <div class="app-item-add-menu-items">
      <a @click.stop="onAdd('action')">Action</a>
      <a @click.stop="onAdd('spacer')">Spacer</a>
      <a @click.stop="onAdd('transport')">Transport</a>
      <a @click.stop="onAdd('position')">Position</a>
      <a @click.stop="onAdd('markers')">Markers</a>
      <a @click.stop="onAdd('regions')">Regions</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onAdd(type) {
      document.getElementById('app-item-add-menu').classList.add('hidden')
      this.$store.commit('add_item', type)
    },
    onCancel(event) {
      this.$store.commit('add_item_cancel')
    }
  }
}
</script>

<style scoped>
</style>
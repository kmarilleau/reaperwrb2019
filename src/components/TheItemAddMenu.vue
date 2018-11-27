<template>
  <div id="app-item-add-menu" :class="{ hidden: !this.$store.state.editor.menu }">
    <button style="grid-column-end: 6 span;" @click.stop="onCancel()">Cancel</button>
    <button @click.stop="onAdd('action')">Action</button>
    <button @click.stop="onAdd('spacer')">Spacer</button>
    <button @click.stop="onAdd('transport')">Transport</button>
    <button @click.stop="onAdd('markers')">Markers</button>
    <button @click.stop="onAdd('regions')">Regions</button>
  </div>
</template>

<script>
export default {
  methods: {
    onAdd: function(type) {
      document.getElementById('app-item-add-menu').classList.add('hidden')
      this.$store.commit('add_item', type)
    },
    onCancel: function(event) {
      this.$store.commit('add_item_cancel')
    }
  }
}
</script>

<style scoped>
#app-item-add-menu {
  background: #121212;
  position: absolute;
  top: 0;
  left: 1024px;
  right: 0;
  bottom: 0;
  width: inherit;
  z-index: 1000;
  display: grid;
  padding-top: 34px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 100px);
}

#app-item-add-menu button {
  display: inline-block;
  line-height: 100px;
  text-align: center;
  margin: 1px;
  font-size: 125%;
}
</style>
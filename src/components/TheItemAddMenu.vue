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
}

.app-item-add-menu-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
}

#app-item-add-menu button {
  margin: 20px;
}

#app-item-add-menu a {
  display: block;
  margin: 1px;
  font-size: 125%;
  cursor: pointer;
  border: 1px solid #222222;
  background: #222222;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  opacity: 0.5;
}

#app-item-add-menu a:hover {
  opacity: 1;
}
</style>
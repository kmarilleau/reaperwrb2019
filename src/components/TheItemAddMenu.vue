<template>
  <div id="app-item-add-menu" :class="{ hidden: !this.$store.state.editor.menu }">
    <div><a @click.stop="onAdd('action')">Action</a></div>
    <div><a @click.stop="onAdd('spacer')">Spacer</a></div>
    <div><a @click.stop="onAdd('transport')">Transport</a></div>
    <div><a @click.stop="onAdd('markers')">Markers</a></div>
    <div><a @click.stop="onAdd('regions')">Regions</a></div>
  </div>
</template>

<script>
export default {
  methods: {
    onAdd: function(type) {
      document.getElementById('app-item-add-menu').classList.add('hidden')
      this.$store.commit('add_item', type)
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(6, 100px);
  grid-row-gap: 20px;
}

#app-item-add-menu div {
  display: inline-block;
  line-height: 100px;
  text-align: center;
}

#app-item-add-menu a {
  display: block;
  margin: 10px;
  border: 3px solid #424242;
  border-radius: 5px;
  cursor: pointer;
  font-size: 150%;
}

#app-item-add-menu a:hover {
  background-color: #424242;
}
</style>
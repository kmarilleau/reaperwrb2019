<template>
  <div class="app-tab-navigation-item app-tab-add"
    v-if="this.$store.getters.isModeEditor && !this.$store.getters.isEditorModeSave"
    :style="{
      width: this.$store.getters.itemWidth / 2 + 'px'  
    }"
  >
    <a class="app-tab-add-inner" @click.stop="onTabAdd">
      <svgicon icon="plus" />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    onTabAdd(event) {
      this.$store.commit('hideHelp')
      this.$store.commit('clearEditHighlight')
      this.$store.commit('addTab')
    }
  }
}
</script>

<style scoped>
</style>
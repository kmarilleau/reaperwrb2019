<template>
  <div class="app-tab-navigation-item app-tab-add"
    v-if="this.$store.getters.isModeEditor && !this.$store.getters.isEditorModeSave"
  >
    <a class="app-tab-add-inner" @click.stop="onTabAdd"><font-awesome-icon icon="plus" size="1x" /></a>
  </div>
</template>

<script>
export default {
  methods: {
    onTabAdd(event) {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('addTab')
    }
  }
}
</script>

<style scoped>
</style>
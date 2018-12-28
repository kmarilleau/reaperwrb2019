<template>
  <div class="app-tab-navigation-item app-tab-add"
    v-if="this.$store.state.editor.enabled 
    && this.$store.state.editor.menu === false
    && !this.$store.state.editor.bulk_edit"
    :class="{ hidden: this.$store.state.editor.delete_dialog }"
  >
    <a @click.stop="onTabAdd"><font-awesome-icon icon="plus" size="1x" /></a>
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
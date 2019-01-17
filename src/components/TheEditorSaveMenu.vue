<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeSave"
  >

    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <font-awesome-icon icon="ban" /> Cancel
    </button>

    <button class="pure-button pure-button-primary"
      @click.stop="onSaveHTML()">
      <font-awesome-icon icon="save" /> HTML
    </button>  

    <button class="pure-button pure-button-primary"
      v-if="this.$store.getters.hasLocalStorage"
      @click.stop="onSaveLocalStorage()">
      <font-awesome-icon icon="save" /> Local
    </button>

    <button class="pure-button pure-button-primary"
      @click.stop="onSaveJSON()">
      <font-awesome-icon icon="save" /> JSON
    </button>

  </div>
</template>

<script>
export default {
  methods: {
    onCancel() { this.$store.commit('setEditorModeMain') },
    onSaveHTML() { this.$store.commit('saveHTML') },
    onSaveLocalStorage() { this.$store.commit('saveLocalStorage') },
    onSaveJSON() { this.$store.commit('saveJSON') },
  }
}
</script>

<style scoped>
</style>
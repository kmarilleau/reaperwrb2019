<template>
<div id="app-item-save-dialog" 
  v-if="this.$store.state.editor.save_dialog"
  :class="{ hidden: !this.$store.state.editor.save_dialog }">
    <div>
      <div class="app-editor-dialog-info">Save</div>

      <button class="pure-button pure-button-secondary"
        @click.stop="onCancel">
        <font-awesome-icon icon="ban" /> Cancel
      </button>

      <button class="pure-button pure-button-primary"
        @click.stop="onSaveHTML()">
        <font-awesome-icon icon="save" /> Save HTML
      </button>  

      <button class="pure-button pure-button-primary"
        @click.stop="onSaveLocalStorage()">
        <font-awesome-icon icon="save" /> Save Local
      </button>

      <button class="pure-button pure-button-primary"
        @click.stop="onSaveJSON()">
        <font-awesome-icon icon="save" /> Save JSON
      </button>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onCancel() {
      this.$store.commit('cancelSave')
    },
    onSaveHTML() {
      this.$store.commit('saveHTML')
    },
    onSaveLocalStorage() {
      this.$store.commit('saveLocalStorage')
    },
    onSaveJSON() {
      this.$store.commit('saveJSON')
    },
  }
}
</script>

<style scoped>
</style>
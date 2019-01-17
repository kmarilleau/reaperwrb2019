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

    <div class="app-editor-webremote-title">
      <label>Webremote Title</label>
      <input name="title" type="text" id="app-webremote-title" v-model="webremoteTitle" autofocus>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    webremoteTitle: {
      get() {
        return this.$store.getters.webremoteTitle
      },
      set(value) {
        this.$store.commit('setWebremoteTitle', value)
      },
    }
  },
  methods: {
    onCancel() { this.$store.commit('setEditorModeMain') },
    onSaveHTML() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.$store.commit('saveHTML') 
        this.$store.commit('setEditorModeMain')
      }
    },
    onSaveLocalStorage() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.$store.commit('saveLocalStorage')
        this.$store.commit('setEditorModeMain')
        this.$store.commit('setModeStartup')
      }
    },
    onSaveJSON() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.$store.commit('saveJSON') 
        this.$store.commit('setEditorModeMain')
      }
    },
  }
}
</script>

<style scoped>
</style>
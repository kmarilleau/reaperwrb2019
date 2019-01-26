<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeSave"
  >

    <button class="pure-button pure-button-secondary app-editor-button"
      @click.stop="onCancel">
      <font-awesome-icon icon="ban" />
    </button>

    <button title="save in local browser storage" class="pure-button pure-button-primary app-editor-button"
      v-if="this.$store.getters.hasLocalStorage"
      @click.stop="onSaveLocalStorage()"
      @mouseenter="help = 'test'"
    >
      <font-awesome-icon :icon="['fab', this.$store.getters.browser]" />
    </button>

    <button title="save as html" class="pure-button pure-button-primary app-editor-button"
      @click.stop="onSaveHTML()">
      <font-awesome-icon icon="code" />
    </button>  

    <button title="save as json" class="pure-button pure-button-primary app-editor-button"
      @click.stop="onSaveJSON()">
      <font-awesome-icon icon="hdd" />
    </button>

    <div class="app-editor-webremote-title">
      <label>Webremote Title</label>
      <input name="title" type="text" id="app-webremote-title" v-model="webremoteTitle" autofocus>
    </div>

  </div>
</template>

<script>
export default {

  data() {
    return {
      help: 'This is some help'
    }
  },

  computed: {
    webremoteTitle: {
      get() {
        return this.$store.getters.webremoteTitle
      },
      set(value) {
        this.$store.commit('setWebremoteTitle', value)
      },
    },
  },

  methods: {

    onCancel() { 
      this.$store.commit('setEditorModeMain') 
    },

    onSaveHTML() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.$store.commit('saveHTML') 
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
      }
    },
  }
}
</script>

<style scoped>
</style>
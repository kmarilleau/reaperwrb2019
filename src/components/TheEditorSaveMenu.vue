<template>
  <div class="app-editor-menu"
    v-if="this.$store.getters.isEditorModeSave"
  >

    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <svgicon icon="blocked" /> Cancel
    </button>

    <button title="save in local browser storage" class="pure-button pure-button-primary"
      v-if="this.$store.getters.hasLocalStorage"
      @click.stop="onSaveLocalStorage()"
      @mouseenter="help = 'test'"
    >
      <svgicon icon="storage" /> Browser
    </button>

    <button title="save as html" class="pure-button pure-button-primary"
      @click.stop="onSaveHTML()">
      <svgicon icon="code" /> HTML
    </button>  

    <button title="save as json" class="pure-button pure-button-primary"
      @click.stop="onSaveJSON()">
      <svgicon icon="drive" /> JSON
    </button>


    <div class="app-editor-webremote-title">
      <label>Webremote Title</label>
      <input name="title" type="text" id="app-webremote-title" v-model="webremoteTitle" autofocus @keyup.enter="onKeyupEnter($event)">
    </div>

    <div class="app-editor-menu-help">
    
      <label><svgicon icon="storage" /> Browser</label>
      <p>Saves the webremote into the local browser storage of this device.</p>
      <p>Deleting the browser cache will delete it!</p>

      <label><svgicon icon="code" /> HTML</label>
      <p>Lets you download and save the webremote as <em>.html</em> file 
      into your <em>reaper_www_root</em> folder.</p>
      <p>Webremotes saved as HTML are accessible from all devices via
      <em>rc.reaper.fm/[filename].html</em></p>

      <label><svgicon icon="drive" /> JSON</label>
      <p>Lets you download and save the webremote as <em>.json</em> file
      into your <em>reaper_www_root</em> folder.</p>
      <p>Webremotes saved to JSON storage are accessible from all devices.</p>
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

    onKeyupEnter(event) {
      event.target.blur()
    },
  }
}
</script>

<style scoped>
</style>
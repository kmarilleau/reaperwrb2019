<template>
  <div class="app-editor__menu"
    v-if="isEditorModeSave"
  >

    <app-editor-button label="Cancel" icon="blocked" @click.native="onCancel" class="pure-button-secondary" />
    
    <app-editor-button 
      v-if="hasLocalStorage"
      label="Browser" icon="storage" @click.native.stop="onSaveLocalStorage" class="pure-button-primary"
    />

    <app-editor-button label="HTML" icon="code" @click.native.stop="onSaveHTML" class="pure-button-primary" />
    
    <app-editor-button label="DB" icon="drive" @click.native.stop="onSaveJSON" class="pure-button-primary" />

    <div class="app-editor__webremote-title">
      <label>Webremote Title</label>
      <input name="title" type="text" id="app-webremote-title" v-model="webremoteTitle" autofocus 
        @keyup.enter="onKeyupEnter($event)"
      >
    </div>

    <div class="app-editor__menu-help">
    
      <label><svgicon icon="storage" /> Browser</label>
      <p>Saves the webremote into the local browser storage of this device.</p>
      <p>Deleting the browser cache will delete it!</p>

      <label><svgicon icon="code" /> HTML</label>
      <p>Lets you download and save the webremote as <em>.html</em> file 
      into your <em>reaper_www_root</em> folder.</p>
      <p>Webremotes saved as HTML are accessible from all devices via
      <em>rc.reaper.fm/[filename].html</em></p>

      <label><svgicon icon="drive" /> DB</label>
      <p>Lets you download and save the webremote to a db file named <em>reaperwrb.json</em>.</p>
      <p>The file needs to be saved to your <em>reaper_www_root/</em> folder.</p>
      <p>Webremotes saved this way are accessible from all devices.</p>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default {

  components: {
    'app-editor-button': BaseEditorButton
  },

  data() {
    return {
      help: 'This is some help'
    }
  },

  computed: {

    ...mapGetters([
      'isEditorModeSave',
      'hasLocalStorage',

    ]),

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

    ...mapMutations([
      'setEditorModeMain',
      'saveHTML',
      'setEditorModeMain',
      'saveLocalStorage',
      'unload',
      'setEditorModeMain',
      'setModeStartup',
      'saveJSON',
      'setEditorModeMain'
    ]),

    onCancel() { 
      this.setEditorModeMain()
    },

    onSaveHTML() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.saveHTML()
        this.setEditorModeMain()
      }
    },

    onSaveLocalStorage() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.saveLocalStorage()
        this.unload()
        this.setEditorModeMain()
        this.setModeStartup()
      }
    },

    onSaveJSON() { 
      if(this.webremoteTitle === '') {
        document.querySelector('#app-webremote-title').focus()
      } else {
        this.saveJSON()
        this.setEditorModeMain()
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
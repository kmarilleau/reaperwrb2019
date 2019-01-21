<template>
  <div class="app-startup">

    <div class="app-startup-container">
    
      <div class="logo">
        <img src="/reaperwrb/icons/icon-512x512.png" />
      </div>

      <div class="app-button-launch-editor">
        <button class="pure-button pure-button-primary app" 
          @click="onLaunchEditor()">
          <span>Editor</span>
        </button>
      </div>

      <div class="app-button-load-default"
        @click="onLoadDefault()"
      >
        <button class="app-button-launch-preset"
            @click.stop="onLoadDefault()"
          >
            <font-awesome-icon icon="external-link-alt" />
           Default
          </button>
      </div>

      <template
        v-if="this.$store.getters.showLocalStorage"
      >
        <div class="app-preset-container"
          v-for="(webremote,index) in this.$store.getters.getLocalStorageWebremotes" :key="index"
        > 
          <button class="app-button-launch-preset"
            @click.stop="onLoadLocal(webremote.title, webremote.timestamp)"
          >
            <font-awesome-icon icon="external-link-alt" />
            {{webremote.title}}
          </button>
          <div class="app-preset-buttons">
            <button class="pure-button-primary"
              @click.stop="onEditLocal(webremote.title, webremote.timestamp)"
            >
              <font-awesome-icon icon="pen" />
            </button>
            <button class="pure-button-warning"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </template>

      <template>
        <button class="app-button-json-storage"
          v-for="(webremote,index) in this.$store.getters.getJSONStorageWebremotes" :key="index"
          @click.stop="onLoadJSON(webremote.title, webremote.timestamp)"
        >
          <span>JSON<br /><br />{{webremote.title}}</span>
        </button>
      </template>
   
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import example from '@/example'
export default {

  mounted() {
    document.title = "ReaperWRB / Start"
  },

  methods: {
    onLaunchEditor() {
      this.$store.commit('fadeInLoader')
      this.$store.commit('setModeEditor')
    },

    onLoadDefault() {
      const webremote = cloneDeep(example)
      this.$store.commit('import', webremote)
      this.$store.commit('setModeRemote')
    },

    onLoadJSON(title, timestamp) {
      let loadSuccess = false
      this.$store.getters.getJSONStorageWebremotes.forEach((webremote, index) => {

        if(webremote.title === title
        && webremote.timestamp === timestamp) {

          this.$store.commit('import', this.$store.getters.getJSONStorageWebremoteByIndex(index))
          this.$store.commit('setModeRemote')
          loadSuccess = true
        }
        
        if(!loadSuccess)
          console.log("REAPERWRB ERROR: Could not load local storage.")

        return loadSuccess
      })
    },

    onEditJSON(title, timestamp) {
      if(this.onLoadJSON(title, timestamp)) {
        this.$store.commit('fadeInLoader')
        this.$store.commit('setModeEditor')
      }
    },

    onDeleteJSON(title, timestamp) {

    },

    onLoadLocal(title, timestamp) {
      if(this.$store.getters.hasLocalStorage) {
        let loadSuccess = false
        this.$store.getters.getLocalStorageWebremotes.forEach((webremote, index) => {
          if(webremote.title === title
          && webremote.timestamp === timestamp) {
            this.$store.commit('import', this.$store.getters.getLocalStorageWebremoteByIndex(index))
            this.$store.commit('setModeRemote')
            loadSuccess = true
          }
        })

        if(!loadSuccess)
          console.log("REAPERWRB ERROR: Could not load local storage.")

        return loadSuccess
      }
    },

    onEditLocal(title, timestamp) {
      if(this.onLoadLocal(title, timestamp)) {
        this.$store.commit('fadeInLoader')
        this.$store.commit('setModeEditor')
      }
    },

    onDeleteLocal(title, timestamp) {
      
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
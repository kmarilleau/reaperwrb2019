<template>
  <div class="app-startup">
    <!-- <div><img src="/static/icons/icon-96x96.png" /></div> -->

    <div class="logo">
      <img src="/reaperwrb/icons/icon-512x512.png" />
    </div>

    <button class="pure-button pure-button-primary app-button-launch-editor" 
      @click="onLaunchEditor()">
      <span>Editor</span>
    </button>

    <button class="pure-button pure-button-warning"
      @click="onLoadDefault()"
    >
      <span>Default</span>
    </button>

    <template
      v-if="this.$store.getters.showLocalStorage"
    >
      <button class="app-button-local-storage"
        v-for="(webremote,index) in this.$store.getters.getLocalStorageWebremotes" :key="index"
        @click.stop="onLoadLocal(webremote.title, webremote.timestamp)"
      > 
        <span>LOCAL<br /><br />{{webremote.title}}</span>
      </button>
    </template>
   
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import example from '@/example'
export default {
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
    onLoadLocal(title, timestamp) {
      if(this.$store.getters.hasLocalStorage) {
        this.$store.getters.getLocalStorageWebremotes.forEach((webremote, index) => {
          console.log(title)
          console.log(webremote.tile)
          console.log(timestamp)
          console.log(webremote.timestamp)
          if(webremote.title === title
          && webremote.timestamp === timestamp) {
            this.$store.commit('import', this.$store.getters.getLocalStorageWebremoteByIndex(index))
            this.$store.commit('setModeRemote')
          } else {
            // FIXME handle fail case
            console.log("REAPERWRB ERROR: Could not load local storage.")
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
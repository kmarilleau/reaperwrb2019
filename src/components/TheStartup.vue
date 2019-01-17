<template>
  <div class="app-startup">
    <!-- <div><img src="/static/icons/icon-96x96.png" /></div> -->

    <div class="logo">
      <img src="/reaperwrb/icons/icon-512x512.png" />
    </div>

    <button class="pure-button pure-button-primary" 
      @click="onLaunchEditor()">
      <span>Editor</span>
    </button>

    <button class="pure-button pure-button-warning"
      @click="onLoadDefault()"
    >
      <span>Default</span>
    </button>

    <template
      v-if="this.$store.state.has_local_storage && typeof(this.$store.state.local_storage.webremotes) !== 'undefined'"
    >
      <button class="app-button-local-storage"
        v-for="(webremote,index) in this.$store.state.local_storage.webremotes" :key="index"
        @click.stop="onLoadLocal(webremote.label)"
      > 
        <span>LOCAL<br /><br />{{webremote.label}}</span>
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
    onLoadLocal(label) {
      this.$store.commit('setModeRemote')
      this.$store.state.local_storage.webremotes.forEach((webremote, index) => {
        if(webremote.label === label)
          this.$store.commit('import', this.$store.state.local_storage.webremotes[index])
      })

      // FIXME handle fail case
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
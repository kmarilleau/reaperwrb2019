<template>
  <div class="app-startup">

    <div class="app-startup-container">
    
      <div class="logo">
        <img src="/reaperwrb/icons/icon-512x512.png" />
      </div>

      <div class="app-button-launch-editor">
        <button class="pure-button pure-button-primary" 
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
        <app-preset-button
          v-for="(webremote, index) in this.$store.getters.getLocalStorageWebremotes" :key="index"
          :title="webremote.title"
          :timestamp="webremote.timestamp"
          type="local"
        />
      </template>

      <template>
        <app-preset-button
          v-for="(webremote,index) in this.$store.getters.getJSONStorageWebremotes" :key="index"
          :title="webremote.title"
          :timestamp="webremote.timestamp"
          type="json"
        />
      </template>
   
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import example from '@/example'
import BasePresetButton from '@/components/BasePresetButton.vue'
export default {

  components: {
    'app-preset-button': BasePresetButton
  },

  mounted() {
    document.title = 'ReaperWRB'
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
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="app-startup">

    <div class="app-startup-container">
    
      <div class="logo"
        :style="getStyle()"
      >
        <img 
          :style="getStyle()"
          src="/reaperwrb_2/icons/icon-512x512.png" 
        />
      </div>

      <div 
        class="app-button-launch-editor"
        v-if="this.$store.getters.isEditorEnabled"
      >
        <button class="pure-button pure-button-primary" 
          :style="getStyle()"
          @click="onLaunchEditor()">
          <span>Editor</span>
        </button>
      </div>

      <div class="app-button-launch-default"
        @click="onLoadDefault()"
      >
        <button class="app-button-launch-preset"
          :style="getStyle()"
          @click.stop="onLoadDefault()"
        >
          <svgicon icon="launch" /><span> Default</span>
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
    
    getStyle() {
      let style = {}

      style.height = this.$store.getters.itemHeight + 'px'

      if(CSS.supports('display: grid'))
        style['min-width'] = this.$store.getters.itemWidth + 'px'
      else
        style['width'] = this.$store.getters.itemWidth + 'px'

      return style
    },

    onLaunchEditor() {
      this.$store.commit('fadeInLoader')
      this.$store.commit('setModeEditor')
      this.$store.commit('showHelp')
    },

    onLoadDefault() {
      const webremote = cloneDeep(example)
      this.$store.commit('import', webremote)
      this.$store.commit('onWindowResize')
      this.$store.commit('getCmdStates')
      this.$store.commit('setModeRemote')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
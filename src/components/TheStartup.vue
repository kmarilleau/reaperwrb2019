<template>
  <div class="app-startup">

    <div class="app-startup-container">
    
      <div class="logo-container"
        :style="getStyle()"
        @click="onReload()"
      >
        <div class="logo"
        >
          <img 
            :height="itemHeight + 'px'"
            :width="itemWidth + 'px'"
            src="/reaperwrb_2/icons/icon-512x512.png" 
          />
        </div>
      </div>

      <div 
        class="app-button-launch-editor"
        v-if="isEditorEnabled"
      >
        <button class="pure-button pure-button-primary" 
          :style="getStyle()"
          @click="onEdit()">
          <span>Editor</span>
        </button>
      </div>

      <div class="app-button-launch-default"
        :style="getStyle()"
      >
        <button class="app-button-launch-preset"
          :style="getStyle()"
          @click.stop="onDefault()"
        >
          <span> Default</span>
        </button>
      </div>

      <template
        v-if="showLocalStorage"
      >
        <app-preset-button
          v-for="(webremote, index) in getLocalStorageWebremotes" :key="index"
          :title="webremote.title"
          :timestamp="webremote.timestamp"
          type="local"
        />
      </template>

      <template>
        <app-preset-button
          v-for="(webremote,index) in getJSONStorageWebremotes" :key="index"
          :title="webremote.title"
          :timestamp="webremote.timestamp"
          type="json"
        />
      </template>
   
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import example from '@/lib/example'
import BasePresetButton from '@/components/BasePresetButton.vue'
export default {

  components: {
    'app-preset-button': BasePresetButton
  },

  mounted() {
    document.title = 'ReaperWRB'
  },

  computed: {
    ...mapGetters([
      'itemWidth',
      'itemHeight',
      'isEditorEnabled',
      'showLocalStorage',
      'getLocalStorageWebremotes',
      'getJSONStorageWebremotes'
    ])
  },

  methods: {

    ...mapMutations([
      'fadeInLoader',
      'setModeEditor',
      'showHelp',
      'import',
      'onWindowResize',
      'getCmdStates',
      'setModeRemote'
    ]),

    ...mapActions([
      'onEditorLaunch',
      'onLoadDefault'
    ]),
    
    getStyle() {
      let style = {}

      style.height = this.itemHeight + 'px'

      if(CSS.supports('display: grid'))
        style['min-width'] = this.itemWidth + 'px'
      else
        style['width'] = this.itemWidth + 'px'

      return style
    },

    onReload() {
      location.reload(true)
    },

    onEdit() {
      this.onEditorLaunch()
    },

    onDefault() {
      this.onLoadDefault()
    },
  }
}
</script>
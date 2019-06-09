<template>
  <div class="app-container" 
    :class="{ 'app-container-editor' : isModeEditor }"
  >
    <app-startup v-if="isModeStartup" />

    <template v-if="!isModeStartup">
      <app-view />
      <app-editor 
        v-if="isModeEditor" 
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TheStartup from '@/components/TheStartup.vue'
import TheView from '@/components/TheView.vue'
import TheEditor from '@/components/TheEditor.vue'

export default {
  components: {
    'app-startup': TheStartup,
    'app-view': TheView,
    'app-editor': TheEditor,
  },

  mounted() {

    // check if we're running from inside a HTML
    const div = document.querySelector('#reaperwrb-json')
    if(typeof(div) !== 'undefined' && div !== null) {
      const webremote = JSON.parse(div.innerHTML)
      // FIXME dispatch
      this.setModeRemote()
      this.import(webremote)
      this.getCmdStates() 
      this.setModeRemote()
    }

    this.fadeOutLoader()
  },

  computed: {
    ...mapGetters([
      'isModeEditor',
      'isModeStartup'
    ])
  },

  methods: {
    ...mapMutations([
      'setModeRemote',
      'import',
      'getCmdStates',
      'setModeRemote',
      'fadeOutLoader'
    ])
  }
}
</script>
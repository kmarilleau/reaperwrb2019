<template>
  <div class="app-container" 
    :class="{ 'app-container-editor' : isAppModeEditor }"
  >
    <app-startup v-if="isAppModeStartup" />

    <template v-if="!isAppModeStartup">
      <app-view />
      <app-editor 
        v-if="isAppModeEditor" 
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
      this.$store.dispatch('onLaunchFromHTML', webremote)
    }

    this.fadeOutLoader()
  },

  computed: {
    ...mapGetters([
      'isAppModeEditor',
      'isAppModeStartup'
    ])
  },

  methods: {
    ...mapMutations([
      'fadeOutLoader'
    ])
  }
}
</script>
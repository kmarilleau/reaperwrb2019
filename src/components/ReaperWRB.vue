<template>
  <div class="app-container" 
    :class="{ 'app-container__editor' : isAppModeEditor }"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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

      // looks hacky but does the trick, textarea will return decoded html entities
      // while still preserving tags (though we don't need that)
      let textarea = document.createElement("textarea")
      textarea.innerHTML = div.innerHTML
      let json = textarea.value

      const webremote = JSON.parse(json)

      this.onLaunchFromHTML(webremote)
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
    ]),

    ...mapActions([
      'onLaunchFromHTML'
    ])
  }
}
</script>
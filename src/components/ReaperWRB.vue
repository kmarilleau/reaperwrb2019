<template>
  <div class="app-container" 
    :class="{ 'app-container-editor' : this.$store.getters.isModeEditor }"
  >
    <app-startup v-if="this.$store.getters.isModeStartup" />

    <template v-if="!this.$store.getters.isModeStartup">
      <app-view />
      <app-editor 
        v-if="this.$store.getters.isModeEditor" 
      />
    </template>
  </div>
</template>

<script>
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
      this.$store.commit('setModeRemote')
      this.$store.commit('import', webremote)
      this.$store.commit('getCmdStates')
      this.$store.commit('setModeRemote')
    }

    this.$store.commit('fadeOutLoader')
  },
}
</script>

<style scoped>
</style>
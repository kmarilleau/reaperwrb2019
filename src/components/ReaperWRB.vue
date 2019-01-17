<template>
  <div class="app-container" 
    :class="{ 'app-container-editor' : this.$store.getters.isModeEditor }"
  >
    <app-startup v-if="this.$store.getters.isModeStartup" />

    <template v-if="!this.$store.getters.isModeStartup">
      <app-view 
        :tabs="this.$store.state.webremote.tabs" 
        :tab="this.$store.state.webremote.active_tab"
      />
      <app-editor 
        v-if="this.$store.getters.isModeEditor"
        :item="this.$store.state.editor.edit_item"
        :columns="this.$store.state.webremote.columns"
        :editor="this.$store.state.editor"
        :reaper="this.$store.state.reaper"
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
    const div = document.getElementById('reaperwrb-json')
    if(typeof(div) !== 'undefined' && div !== null) {
      const data = JSON.parse(div.innerHTML)
      this.$store.commit('setModeRemote')
      this.$store.commit('import', data)
    }

    this.$store.commit('fadeOutLoader')
  },
}
</script>

<style scoped>
</style>
<template>
  <div class="app-view"
    :class="getClass()"
  >
    <template 
      v-if="this.$store.getters.hasTabs"
    >
      <app-tab-navigation />
      <app-tab />
    </template>

    <app-help 
      :class="{ 'hidden': !this.$store.getters.showHelp }"
    />

  </div>
</template>

<script>
import TheTabNavigation from '@/components/TheTabNavigation.vue'
import TheTab from '@/components/TheTab.vue'
import TheEditorHelp from '@/components/TheEditorHelp.vue'

export default {

  mounted() {
    if(this.$store.getters.isModeRemote)
      document.title = "ReaperWRB / " + this.$store.getters.webremoteTitle
  },

  updated() {
    //this.$store.commit('getCmdStates')
  },

  components: {
    'app-tab-navigation': TheTabNavigation,
    'app-tab': TheTab,
    'app-help': TheEditorHelp
  },

  methods: {
    getClass() {
      return { 'app-view-scroll' : this.$store.getters.isModeEditor }
    }
  }
}
</script>

<style scoped>
</style>
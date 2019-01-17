<template>
  <div class="app-view"
    :class="classScroll()"
  >
    <template v-if="tabs.length > 0 && typeof(tabs[this.tab]) !== 'undefined'">
      <app-tab-navigation 
        :tabs="tabs"
        @e-select-tab="onSelectTab"
      ></app-tab-navigation>
      <app-tab
        :rows="tabs[this.tab].rows"
      ></app-tab>
    </template>

    <app-help v-if="tabs.length === 0" :version="this.$store.getters.version" />

  </div>
</template>

<script>
import TheTabNavigation from '@/components/TheTabNavigation.vue'
import TheTab from '@/components/TheTab.vue'
import TheHelp from '@/components/TheHelp.vue'

export default {
  props: ['tabs', 'tab'],

  updated() {
    this.$store.commit('getCmdStates')
  },

  components: {
    'app-tab-navigation': TheTabNavigation,
    'app-tab': TheTab,
    'app-help': TheHelp
  },

  methods: {
    onSelectTab(tab) {
      this.$emit('e-select-tab', tab)
    },
    classScroll() {
      return this.$store.getters.isModeEditor ? 'app-view-scroll' : false
    }
  }
};
</script>

<style scoped>
</style>
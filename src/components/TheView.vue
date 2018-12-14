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
  </div>
</template>

<script>
import TheTabNavigation from '@/components/TheTabNavigation.vue';
import TheTab from '@/components/TheTab.vue';

export default {
  props: ['tabs', 'tab'],

  components: {
    'app-tab-navigation': TheTabNavigation,
    'app-tab': TheTab
  },

  methods: {
    onSelectTab(tab) {
      this.$emit('e-select-tab', tab)
    },
    classScroll() {
      return this.$store.state.editor.enabled ? 'app-view-scroll' : false
    }
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="app-tab-navigation">
    
    <app-tab-navigation-item
      v-for="(tab, index) in tabs" :key="index"
      :tab="tab"
      :index="index"
    ></app-tab-navigation-item>

    <app-tab-add v-if="this.$store.state.editor.enabled" />
  </div>
</template>

<script>
import BaseTabNavigationItem from '@/components/BaseTabNavigationItem.vue';
import TheTabAdd from '@/components/TheTabAdd.vue'

export default {
  props: [
    'tabs',
  ],

  components: {
    'app-tab-navigation-item': BaseTabNavigationItem,
    'app-tab-add': TheTabAdd
  },

  methods: {
  }
};
</script>

<style scoped>
</style>
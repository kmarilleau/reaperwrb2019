<template>
  <div class="app-tab-navigation"
    :style="{ gridTemplateColumns: 'repeat(' + this.$store.state.options.columns.desktop + ', 1fr)' }"

  >
    <app-tab-navigation-item
      v-for="(tab, index) in tabs" :key="index"
      :tab="tab"
      :index="index"
    ></app-tab-navigation-item>

    <app-tab-add 
      v-if="this.$store.state.editor.enabled 
      && this.$store.state.editor.menu === false"
      :class="{ hidden: this.$store.state.editor.delete_dialog }"
    />

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
  }
};
</script>

<style scoped>
</style>
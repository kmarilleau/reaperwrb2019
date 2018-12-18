<template>
  <draggable 
    :class="'app-tab-navigation'"
    v-model="tabs"
    :style="{ gridTemplateColumns: 'repeat(' + this.$store.state.options.columns.desktop + ', 1fr)' }"
    :options="{ 
      draggable: this.$store.state.editor.enabled && !this.$store.state.editor.bulk_edit ? '.app-tab-navigation-item' : false, 
      group: 'tabs',
      sort: this.$store.state.editor.enabled 
    }"
    @end="onDraggableEnd"
  >
    <app-tab-navigation-item
      v-for="(tab, index) in tabs" :key="index"
      :tab="tab"
      :index="index"
    ></app-tab-navigation-item>

    <app-tab-add />

  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import BaseTabNavigationItem from '@/components/BaseTabNavigationItem.vue';
import TheTabAdd from '@/components/TheTabAdd.vue'

export default {
  components: {
    'draggable': draggable,
    'app-tab-navigation-item': BaseTabNavigationItem,
    'app-tab-add': TheTabAdd
  },

  computed: {
    tabs: {
      get() {
        return this.$store.state.tabs
      },
      set(value) {
        this.$store.commit('update_tabs', value)
      }
    }
  },

  methods: {
    onDraggableEnd(event) {
      this.$store.commit('switch_tab', event.newIndex)
    }
  }
};
</script>

<style scoped>
</style>
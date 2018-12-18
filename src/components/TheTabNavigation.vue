<template>
  <draggable 
    :class="'app-tab-navigation'"
    v-model="tabs"
    :style="{ gridTemplateColumns: 'repeat(' + this.$store.state.options.columns.desktop + ', 1fr)' }"
    :options="{ 
      draggable: this.$store.state.editor.enabled && !this.$store.state.editor.bulk_edit ? '.app-tab-navigation-item' : false, 
      group: { name: 'tabs', put: ['items'] },
      sort: this.$store.state.editor.enabled,
    }"
    @start="onDraggableStart"
    @add="onDraggableAdd"
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
        // only set on sort, when length doesn't change
        if(value.length === this.$store.state.tabs.length)
          this.$store.commit('update_tabs', value)
      }
    }
  },

  methods: {
    onDraggableStart(event) {
      document.querySelector('.sortable-ghost').style.display = 'block'
    },
    onDraggableEnd(event) {
      this.$store.commit('switch_tab', event.newIndex)
    },
    onDraggableAdd(event) {
      this.$store.commit('move_item')
    }
  }
};
</script>

<style scoped>
</style>
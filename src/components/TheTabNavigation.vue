<template>
  <draggable 
    :class="'app-tab-navigation'"
    v-model="tabs"
    :style="{ gridTemplateColumns: 'repeat(' + this.$store.getters.globalColumns + ', 1fr)' }"
    :options="{ 
      draggable: this.$store.getters.isModeEditor && !this.$store.getters.isEditorBulkEdit ? '.app-tab-navigation-item' : false, 
      group: { name: 'tabs', put: ['items'] },
      sort: this.$store.getters.isModeEditor,
      disabled: this.$store.getters.disableSort
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

    <div class="app-tab-navigation-item app-tab-navigation-special"
      v-if="this.$store.getters.isModeRemote"
    >
      <div @click.stop="onHome()">
        <font-awesome-icon icon="home" />
      </div>
      <div @click.stop="onEdit()">
        <font-awesome-icon icon="pen" />
      </div>
    </div>

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
        return this.$store.getters.getTabs
      },
      set(value) {
        // only set on sort, when length doesn't change
        if(value.length === this.$store.getters.getTabs.length)
          this.$store.commit('updateTabs', value)
      }
    }
  },

  methods: {
    onHome() {
      this.$store.commit('setModeStartup')
      this.$store.commit('unload')
    },
    onEdit() {
      this.$store.commit('fadeInLoader')
      this.$store.commit('setModeEditor')
    },
    onDraggableStart(event) {
      document.querySelector('.sortable-ghost').style.display = 'block'
      this.$store.commit('clearEditItem')
    },
    onDraggableEnd(event) {
      this.$store.commit('switchTab', event.newIndex)
    },
    onDraggableAdd(event) {
      this.$store.commit('moveItem')
      this.$store.commit('clearEditHighlight')
    }
  }
};
</script>

<style scoped>
</style>
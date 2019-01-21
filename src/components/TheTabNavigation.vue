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
    :move="onDraggableMove"
  >
    <app-tab-navigation-item
      v-for="(tab, index) in tabs" :key="index"
      :tab="tab"
      :index="index"
    ></app-tab-navigation-item>

    <app-tab-add />

    <div class="app-tab-navigation-item app-tab-navigation-special font-2x"
      v-if="this.$store.getters.isModeRemote"
    >
      <div @click.stop="onHome()">
        <font-awesome-icon icon="home" />
      </div>
      <div @click.stop="onEdit()" class="app-button-launch-editor">
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
        return this.$store.getters.tabs
      },
      set(value) {
        // only set on sort, when length doesn't change
        if(value.length === this.$store.getters.tabs.length)
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
    onDraggableMove(event, originalEvent) {
      if(originalEvent.target.parentElement.classList.contains('app-tab-add')
      || originalEvent.target.classList.contains('app-tab-add-inner')
      || originalEvent.target.classList.contains('svg-inline--fa')
      || originalEvent.target.parentElement.classList.contains('app-tab-add-inner')
      || originalEvent.target.parentElement.classList.contains('app-view')
      || originalEvent.target.classList.length === 0)
        return false
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
<template>
  <draggable 
    :class="'app-tab-navigation'"
    v-model="tabs"
    :style="{ 
      gridTemplateColumns: 'repeat(' + globalColumns + ', 1fr)',
    }"
    :options="{ 
      draggable: isAppModeEditor && !isEditorBulkEdit ? '.app-tab-navigation__item' : false, 
      group: { name: 'tabs', put: ['items'] },
      sort: isAppModeEditor,
      disabled: disableSort,
      delay: 10,
    }"
    @start="onDraggableStart"
    @add="onDraggableAdd"
    @end="onDraggableEnd"
    :move="onDraggableMove"
  >
    <app-tab-navigation__item
      v-for="(tab, index) in tabs" :key="index"
      :tab="tab"
      :index="index"
    ></app-tab-navigation__item>

    <app-editor-tab-add />

    <div class="app-tab-navigation__item app-tab-navigation__menu"
      v-if="isAppModeRemote"
      :style="{
        'min-width': itemWidth + 'px',
        'line-height': itemHeight / 2 + 'px'
      }"
    >
      <a @click.stop="onHome()">
        <svgicon icon="home"
          :style = "{
            height: (iconSize / 2) + 'px',
            'min-width': (iconSize / 2) + 'px'
          }"
        />
      </a>
      <a @click.stop="onEdit()"
        v-if="isEditorEnabled"
      >
        <svgicon icon="edit"
            :style = "{
            height: (iconSize / 2) + 'px',
            'min-width': (iconSize / 2) + 'px'
          }"
        />
      </a>
    </div>

  </draggable>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import BaseTabNavigationItem from '@/components/BaseTabNavigationItem.vue'
import TheEditorTabAdd from '@/components/TheEditorTabAdd.vue'

export default {

  components: {
    'draggable': draggable,
    'app-tab-navigation__item': BaseTabNavigationItem,
    'app-editor-tab-add': TheEditorTabAdd
  },

  computed: {

    ...mapGetters([
      'isAppModeEditor',
      'isAppModeRemote',
      'isEditorEnabled',
      'globalColumns',
      'isEditorBulkEdit',
      'disableSort',
      'iconSize',
      'itemWidth',
      'itemHeight',
      'tabs'
    ]),

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

    ...mapMutations([
      'setModeStartup',
      'unload',
      'onWindowResize',
      'fadeInLoader',
      'setModeEditor',
      'clearEditItem',
      'moveItem',
      'clearEditHighlight',
      'switchTab'
    ]),

    onHome() {
      this.setModeStartup()
      this.unload()
      this.onWindowResize()
    },

    onEdit() {
      this.fadeInLoader()
      this.setModeEditor()
      this.onWindowResize()
    },

    onDraggableStart(event) {
      document.querySelector('.sortable-ghost').style.display = 'block'
      this.clearEditItem()
    },

    onDraggableMove(event, originalEvent) {
      // hacky way to cancel dropping item on the tab add button or the
      if(event.draggedContext.futureIndex === 0) {
        if(originalEvent.target.classList.contains('app-tab-navigation__item'))
          return true

        if(originalEvent.target.parentElement.classList.contains('app-tab-navigation__item')) 
          return true

        return false

      } else if (event.draggedContext.futureIndex > this.$store.getters.tabs.length
        || event.draggedContext.futureIndex === this.$store.getters.tabs.length) {
        return false
      }
    },

    onDraggableEnd(event) {
      if(event.newIndex < this.tabs.length)
        this.switchTab(event.newIndex)
      else
        this.switchTab(this.tabs.length - 1)
    },

    onDraggableAdd(event) {
      this.moveItem()
      this.clearEditHighlight()
    }

  }
};
</script>
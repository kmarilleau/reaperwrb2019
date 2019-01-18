<template>
  <div>
    <draggable 
      v-model="items"
      :options="{ 
        draggable: this.$store.getters.draggableClass, 
        group: 'items',
        sort: this.$store.getters.isModeEditor,
        disabled: this.$store.getters.disableSort
      }"
      class="app-row"
      :class="{ 'app-active-row': this.$store.getters.isActiveRow(row) && this.$store.getters.isEditorModeAdd }"
      :style="{ gridTemplateColumns: 'repeat(' + this.$store.getters.globalColumns + ', 1fr)' }"
      @start="onDraggableStart"
      :move="onDraggableMove"
    >

    <template v-if="items.length > 0">
      <app-item
        v-for="(item, index) in items" :key="index"
        :row="row"
        :item="item"
        :index="index"
      />
    </template>
    
    </draggable>

    <app-row-edit-buttons :row="row" />

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BaseRowEditButtons from '@/components/BaseRowEditButtons.vue'
import BaseItem from '@/components/BaseItem.vue';

export default {
  props: ['row'],

  components: {
    'draggable': draggable,
    'app-row-edit-buttons': BaseRowEditButtons,
    'app-item': BaseItem,
  },

  updated() {
    // FIXME document what is going on here
    if(this.$store.state.editor.edit_item !== null && this.$store.state.editor.edit_item.type !== 'tab') {
      if(this.row === this.$store.state.editor.active_row) {
        const el = this.$el.querySelectorAll('.app-highlight-edit')
        if(el.length === 0) {
          const el = this.$el.querySelectorAll('.app-item')
          el[el.length - 1].classList.add('app-highlight-edit')
        }
      }
    }
  },

  computed: {
    items: {
      get() {
        return this.$store.state.webremote.tabs[this.$store.state.webremote.active_tab].rows[this.row]
      },
      set(value) {
        if(this.$store.state.editor.move_item === false)
          this.$store.commit('updateRow', {row: this.row, value: value })
      }
    }
  },

  methods: {

    classRow() {
      return this.$store.getters.isModeEditor ? 'app-editor-grid' : 'app-view-grid'
    },

    onDraggableStart() {
      this.$store.dispatch('onDraggableStart')
    },

    // FIXME dispatch
    onDraggableMove(event, originalEvent) {
      // hacky way to decide if an item is to be moved to another tab
      if(event.related.classList.contains('app-tab-navigation-item') 
      && typeof(event.related.attributes.tab) !== undefined) {

        this.$store.commit('setItemMoveCopy', { 
          row: parseInt(event.dragged.attributes.row.value),
          index: parseInt(event.dragged.attributes.index.value),
          // FIXME 
          target_tab: parseInt(event.related.attributes.tab.value)
        })

        this.$store.commit('clearDropHighlight')

        if(parseInt(event.related.attributes.tab.value) 
        !== this.$store.state.webremote.active_tab) {
          event.related.classList.add('app-item-drop')
        }

      } else {
        this.$store.commit('clearDropHighlight')
        this.$store.commit('setItemMoveCopy', false)
        if(originalEvent.target.classList.contains('app-tab-navigation'))
          return false
      } 
    },
  }
};
</script>

<style scoped>
</style>
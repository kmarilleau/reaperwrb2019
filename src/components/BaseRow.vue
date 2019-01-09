<template>
  <div>
    <draggable 
      v-model="items"
      :options="{ 
        draggable: this.$store.state.editor.enabled && !this.$store.state.editor.bulk_edit ? '.app-item' : false, 
        group: 'items',
        sort: this.$store.state.editor.enabled,
        disabled: disableSort()
      }"
      :class="'app-row'"
      :style="{ gridTemplateColumns: 'repeat(' + this.$store.state.columns + ', 1fr)' }"
      @start="onDraggableStart"
      :move="onDraggableMove"
    >

      <app-item
        v-if="items.length > 0"
        v-for="(item, index) in items" :key="index"
        :row="row"
        :item="item"
        :index="index"
      />
    
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
    if(this.$store.state.editor.edit_item !== false && this.$store.state.editor.edit_item.type !== 'tab') {
      if(this.row === this.$store.state.active_row) {
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
        return this.$store.state.tabs[this.$store.state.active_tab].rows[this.row]
      },
      set(value) {
        if(this.$store.state.editor.move_item === false)
          this.$store.commit('updateRow', {row: this.row, value: value })
      }
    }
  },

  methods: {

    disableSort() {
      if(this.$store.state.editor.enabled) {
        if(this.$store.state.editor.bulk_edit)
          return true
        else
          return false
      } else {
        return true
      }
    },

    classRow() {
      return this.$store.state.editor.enabled ? 'app-editor-grid' : 'app-view-grid'
    },

    onDraggableStart() {
      this.$store.commit('clearEditHighlight')
      this.$store.commit('clearEditItem')
    },

    onDraggableMove(event, originalEvent) {
      // hacky way to decide if an item is to be moved to another tab
      if(event.related.classList.contains('app-tab-navigation-item') && typeof(event.related.attributes.tab) !== undefined) {

        this.$store.commit('setItemMoveCopy', { 
          row: parseInt(event.dragged.attributes.row.value),
          index: parseInt(event.dragged.attributes.index.value),
          // FIXME 
          target_tab: parseInt(event.related.attributes.tab.value)
        })

        this.$store.commit('clearDropHighlight')

        if(parseInt(event.related.attributes.tab.value) !== this.$store.state.active_tab) {
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
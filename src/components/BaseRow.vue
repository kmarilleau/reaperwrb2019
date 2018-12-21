<template>
  <div>
    <draggable 
      v-model="items"
      :options="{ 
        draggable: this.$store.state.editor.enabled && !this.$store.state.editor.bulk_edit ? '.app-item' : false, 
        group: 'items',
        sort: this.$store.state.editor.enabled 
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
    classRow() {
      return this.$store.state.editor.enabled ? 'app-editor-grid' : 'app-view-grid'
    },

    onDraggableStart() {
      this.$store.commit('clearEditHighlight')
    },

    onDraggableMove(event, originalEvent) {
      // hacky way to decide if an item is to be moved to another tab
      if(event.related.classList.contains('app-tab-navigation-item')) {

        this.$store.commit('setItemMoveCopy', { 
          row: parseInt(event.dragged.attributes.row.value),
          index: parseInt(event.dragged.attributes.index.value), 
          target_tab: parseInt(event.related.attributes.tab.value)
        })

        // FIXME use query selector
        const el = document.querySelectorAll('app-item-drop')
        if(el.length > 0) {
          for(let i = 0; i < el.length; i++)
            el[i].classList.remove('app-item-drop')
        }

        if(parseInt(event.related.attributes.tab.value) !== this.$store.state.active_tab) {
          event.related.classList.add('app-item-drop')
        }

      } else {
        const el = document.querySelectorAll('app-item-drop')
        if(el.length > 0) {
          for(let i = 0; i < el.length; i++)
            el[i].classList.remove('app-item-drop')
        }
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
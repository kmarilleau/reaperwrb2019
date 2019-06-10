<template>
  <div>
    <draggable 
      v-model="items"
      :options="{ 
        draggable: draggableClass, 
        group: 'items',
        sort: isAppModeEditor,
        disabled: disableSort,
        delay: 5,
      }"
      class="app-row"
      :class="{ 'app-active-row': isActiveRow(row) && isEditorModeAdd }"
      :style="{ 
        gridTemplateColumns: 'repeat(' + globalColumns + ', 1fr)',
        'min-height': itemHeight + 'px'
      }"
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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

    ...mapGetters([
      'isActiveRow',
      'draggableClass',
      'isAppModeEditor',
      'disableSort',
      'isEditorModeAdd',
      'globalColumns',
      'itemHeight',
      'hasMoveItem',
      'rowItems'
    ]),

    items: {
      get() {
        return this.rowItems(this.row)
      },

      set(value) {
        // update row after moving item
        if(!this.hasMoveItem)
          this.updateRow({ row: this.row, value: value })
      }
    }
  },

  methods: {

    ...mapMutations([
      'clearDropHighlight',
      'clearItemMoveCopy',
      'updateRow',
      'setItemMoveCopy',
      'activeTab'
    ]),

    ...mapActions([
      'onEditorDraggableStart'
    ]),

    classRow() {
      return this.isAppModeEditor ? 'app-editor-grid' : 'app-view-grid'
    },

    onDraggableStart() {
      this.onEditorDraggableStart()
    },

    onDraggableMove(event, originalEvent) {
      // hacky way to decide if an item is to be moved to another tab
      if(event.related.classList.contains('app-tab-navigation__item') 
      && typeof(event.related.attributes.tab) !== 'undefined') {
        
        const payload = {
          row: parseInt(event.dragged.attributes.row.value),
          index: parseInt(event.dragged.attributes.index.value),
          target: parseInt(event.related.attributes.tab.value)
        }

        this.setItemMoveCopy(payload)
        this.clearDropHighlight()

        if(parseInt(event.related.attributes.tab.value) 
        !== this.activeTab) {
          event.related.classList.add('app-item-drop')
        }

      } else {
        
        this.clearDropHighlight()
        this.clearItemMoveCopy()

        // hacky way to cancel dropping item on the tab add button or the
        // empty space in the tab navigation
        if(originalEvent.target.parentElement.classList.contains('app-tab-add') 
        || originalEvent.target.classList.contains('app-tab-add-inner')
        || originalEvent.target.classList.contains('svg-inline--fa')
        || originalEvent.target.parentElement.classList.contains('svg-inline--fa')
        || originalEvent.target.parentElement.classList.contains('app-tab-add-inner')
        || originalEvent.target.parentElement.classList.contains('app-view'))
          return false
      } 
    },
  }
};
</script>
<template>
  <div>
    <draggable 
      v-model="items"
      :options="{ 
        draggable: this.$store.state.editor.enabled ? '.app-item' : false, 
        group: 'items',
        sort: this.$store.state.editor.enabled 
      }"
      :class="'app-row'"
      @start="onDraggableStart"
    >

      <app-item
        v-if="items.length > 0"
        v-for="(item, index) in items" :key="index"
        :row="row"
        :item="item"
        :index="index"
      />
    
    </draggable>

    <app-row-edit-buttons 
      v-if="this.$store.state.editor.enabled 
      && this.$store.state.editor.menu === false" 
      :row="row"
    />

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
        this.$store.commit('update_row', {row: this.row, value: value })
      }
    }
  },

  methods: {
    classRow() {
      return this.$store.state.editor.enabled ? 'app-editor-grid' : 'app-view-grid'
    },

    onDraggableStart() {
      this.$store.commit('clear_highlight')
    }
  }
};
</script>

<style scoped>

</style>
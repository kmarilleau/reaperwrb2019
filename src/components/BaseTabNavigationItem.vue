<template>
  <div class="app-tab-navigation-item"
    :style="{ backgroundColor: tab.bgcolor }"
    :class="getClass()"
    @click.stop="onTabSwitch"
    :tab="index"
  >

    <app-tab-edit-buttons 
      v-if="this.$store.state.webremote.active_tab === index
      && !this.$store.state.editor.bulk_edit"
      :item="tab"
      :index="index"
    />

    <span class="app-item-label font-bold" 
      :style="{ color: tab.textcolor }
    ">
      {{tab.label}}
    </span>
  </div>
</template>

<script>
import BaseItemEditButtons from '@/components/BaseItemEditButtons.vue'

export default {
  props: [
    'tab',
    'index',
  ],

  components: {
    'app-tab-edit-buttons': BaseItemEditButtons,
  },

  methods: {
    getClass() {
      const classes = { 'app-tab-navigation-item-active': this.index == this.$store.state.webremote.active_tab }

      if(this.$store.state.editor.edit_item.type === 'tab'
        && this.$store.state.webremote.active_tab === this.index
      ) {
        classes['app-highlight-edit'] = true
      }
      return classes
    },

    onTabSwitch(event) {
      if(!this.$store.state.editor.bulk_edit) {
        this.$store.commit('clearEditHighlight')
        this.$store.commit('switchTab', this.index)
      }
    }
  }
};
</script>

<style scoped>
</style>
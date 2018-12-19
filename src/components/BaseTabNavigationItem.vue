<template>
  <div class="app-tab-navigation-item"
    :style="{ backgroundColor: tab.bgcolor }"
    :class="{ 'app-tab-navigation-item-active': this.index == this.$store.state.active_tab }"
    @click.stop="onTabSwitch"
    :tab="index"
  >

    <app-tab-edit-buttons 
      v-if="this.$store.state.editor.enabled
      && this.$store.state.active_tab === index
      && !this.$store.state.editor.bulk_edit"
      :item="tab"
      :index="index"
      :class="{ hidden: this.$store.state.editor.menu }"
    />

    <span class="app-item-label" 
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
    onTabSwitch(event) {
      if(!this.$store.state.editor.bulk_edit)
        this.$store.commit('switch_tab', this.index)
    }
  }
};
</script>

<style scoped>
</style>
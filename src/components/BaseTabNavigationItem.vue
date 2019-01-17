<template>
  <div class="app-tab-navigation-item"
    :style="{ backgroundColor: tab.bgcolor }"
    :class="{ 
      'app-tab-navigation-item-active' : this.$store.getters.isActiveTab(index),
      'app-highlight-edit' : this.$store.getters.isTabEdit(index) 
    }"
    @click.stop="onTabSwitch"
    :tab="index"
  >

    <app-tab-edit-buttons 
      v-if="this.$store.getters.isActiveTab(index)"
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
    onTabSwitch(event) {
      this.$store.dispatch('onSwitchTab', this.index)
    }
  }
};
</script>

<style scoped>
</style>
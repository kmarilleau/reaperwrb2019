<template>
  <div class="app-tab-navigation-item"
    :style="{ backgroundColor: tab.bgcolor }"
    :class="{ active: this.index == this.$store.state.active_tab }"
    @click.stop="onTabSwitch"
  >

    <app-tab-edit-buttons 
      v-if="this.$store.state.editor.enabled"
      :item="tab"
      :index="index"
    />

    <span class="app-item-tab-label" 
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
    onTabSwitch: function(event) {
      this.$store.commit('switch_tab', this.index)
    }
  }
};
</script>

<style scoped>
.app-tab-navigation-item {
  opacity: 0.5;
}
.active {
  opacity: 1;
}
</style>
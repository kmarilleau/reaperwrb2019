<template>
  <div class="app-editor-slider-itemwidth-container"
    v-if="!this.$store.getters.editItemType('tab')"
  >
    <label>Item Width</label>
      <app-editor-slider
        v-model="itemWidth"
        :min="itemMinWidth" 
        :max="itemMaxWidth" 
        :width="400" :piecewise="true"
      />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  components: {
    'app-editor-slider': VueSlider
  },

  computed: {
    itemMinWidth() {
      return this.$store.getters.editItemKey('minwidth', 1)
    },

    itemMaxWidth() {
      return parseInt(this.$store.getters.globalColumns)
    },
    itemWidth: {
      get() {
        return this.$store.getters.editItemKey('width', 1)
      },
      set(value) {
        if(this.$store.getters.editItemHasKey('width'))
          this.$store.commit('updateItem', { key: 'width', val: value })
      }
    },
  }
}
</script>
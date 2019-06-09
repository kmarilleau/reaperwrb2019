<template>
  <div class="app-editor-slider-itemwidth-container"
    v-if="!editItemType('tab')"
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
import { mapGetters, mapMutations } from 'vuex'
import VueSlider from 'vue-slider-component'

export default {
  components: {
    'app-editor-slider': VueSlider
  },

  computed: {

    ...mapGetters([
      'editItemType',
      'globalColumns',
      'editItemKey',
      'editItemHasKey'
    ]),

    itemMinWidth() {
      return this.editItemKey('minwidth', 1)
    },

    itemMaxWidth() {
      return parseInt(this.globalColumns)
    },
    itemWidth: {
      get() {
        return this.editItemKey('width', 1)
      },
      set(value) {
        if(this.editItemHasKey('width'))
          this.updateItem({ key: 'width', val: value })
      }
    },
  },

  methods: {
    ...mapMutations([
      'updateItem'
    ])
  }
}
</script>
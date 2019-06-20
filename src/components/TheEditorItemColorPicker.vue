<template>
  <div class="app-item-color-picker"
    v-if="editItemHasKey('bgcolor') || isEditorBulkEdit" 
  >
    <label>Background Color: {{ getColor.hex }}</label>
    <app-item-color-picker-swatches v-model="getColor" />
    <app-item-color-picker-slider v-model="getColor" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Slider } from 'vue-color'
import { Compact } from 'vue-color'

export default {
  props: ['color'],

  components: {
    'app-item-color-picker-slider': Slider,
    'app-item-color-picker-swatches': Compact
  },

  computed: {

    ...mapGetters([
      'editItemHasKey',
      'isEditorBulkEdit',
      'editItemKey'
    ]),

    getColor: { 
      get() { 
        return {
          hex: this.editItemKey('bgcolor', '#222222')
        }
      },
      set(value) {
        if(this.isEditorBulkEdit)
          this.updateItems({ key: 'bgcolor', val:value.hex })
        else 
          this.updateItem({ key: 'bgcolor', val:value.hex })
      } 
    }
  },

  methods: {
    ...mapMutations([
      'updateItems',
      'updateItem'
    ])
  }

};
</script>

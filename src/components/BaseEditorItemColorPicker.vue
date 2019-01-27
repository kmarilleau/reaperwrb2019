<template>
  <div class="app-item-color-picker">
    <label>Background: {{color}}</label>
    <app-item-color-picker-swatches v-model="getColor" />
    <app-item-color-picker-slider v-model="getColor" />
  </div>
</template>

<script>
import { Slider } from 'vue-color'
import { Compact } from 'vue-color'

export default {
  props: ['color'],

  computed: {
    getColor: { 
      get() { 
        return {
          hex: this.color
        }
      },
      set(value) {
        if(this.$store.getters.isEditorBulkEdit)
          this.$store.commit('updateItems', { key: 'bgcolor', val:value.hex })
        else 
          this.$store.commit('updateItem', { key: 'bgcolor', val:value.hex })
      } 
    }
  },

  components: {
    'app-item-color-picker-slider': Slider,
    'app-item-color-picker-swatches': Compact
  },
};
</script>

<style>
</style>
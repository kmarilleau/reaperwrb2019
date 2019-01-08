<template>
  <div class="app-item-color-picker">
    <label>Background Color: {{color}}</label>
    <app-item-color-picker-swatches v-model="getColor" @input="updateValue" />
    <app-item-color-picker-slider v-model="getColor" @input="updateValue" />
  </div>
</template>

<script>
import { Slider } from 'vue-color'
import { Compact } from 'vue-color'

export default {
  props: ['color'],

  computed: {
    getColor() { return this.color }
  },

  components: {
    'app-item-color-picker-slider': Slider,
    'app-item-color-picker-swatches': Compact
  },

  methods: {
    updateValue(event) {
      if(this.$store.state.editor.bulk_edit)
        this.$store.commit('updateItems', {key: 'bgcolor', val:event.hex })
      else 
        this.$store.commit('updateItem', { key: 'bgcolor', val:event.hex })
    }
  }
};
</script>

<style>
</style>
<template>
  <div class="app-item-color-picker">
    <app-item-color-picker-swatches :value="color" @input="updateValue" />
    <app-item-color-picker-slider :value="color" @input="updateValue" />
  </div>
</template>

<script>
import { Slider } from 'vue-color'
import { Compact } from 'vue-color'

export default {
  props: ['color'],

  data() {
      return {
        colors: this.color
      }
  },

  components: {
    'app-item-color-picker-slider': Slider,
    'app-item-color-picker-swatches': Compact
  },

  methods: {
    updateValue: function(event) {
      this.$store.commit('update_item', { key: 'bgcolor', val:event.hex })
    }
  }
};
</script>

<style scoped>
.vc-slider {
  width: inherit;
  background: #f0f0f0;
  border-radius: 2px;
  padding: 5px;
  margin: 11px 0 22px 0;
}
.vc-compact {
  margin: 0 0 16px 0;
  padding: 5px;
  background: #f0f0f0;
  width: inherit;
}

</style>
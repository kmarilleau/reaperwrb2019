<template>
  <div class="app-text-color-picker">
    <label>Text: {{color}}</label>
    <app-text-color-picker v-model="value" :palette="palette" @input="updateValue" />
  </div>
</template>

<script>
import { Grayscale } from "vue-color";

export default {
  props: ['color'],

  data() {
    return {
      value: this.color,
      palette: ['#ffffff', '#E6E6E6', '#CCCCCC', 
                '#B3B3B3', '#999999', '#808080', 
                '#666666', '#595959', '#4D4D4D', 
                '#333333', '#0D0D0D', '#000000'],
    }
  },

  components: {
    "app-text-color-picker": Grayscale
  },

  methods: {
    updateValue(event) {
      if(this.$store.getters.isEditorBulkEdit)
        this.$store.commit('updateItems', { key: 'textcolor', val: event.hex })
      else
        this.$store.commit('updateItem', { key: 'textcolor', val: event.hex })
    }
  }
};
</script>

<style>
</style>
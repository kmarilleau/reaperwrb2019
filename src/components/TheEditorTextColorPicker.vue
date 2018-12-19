<template>
  <div class="app-text-color-picker">
    <label>Text Color</label>
    <app-text-color-picker :value="color" @input="updateValue" />
  </div>
</template>

<script>
import { Grayscale } from "vue-color";

export default {
  props: ['color'],

  components: {
    "app-text-color-picker": Grayscale
  },

  methods: {
    updateValue(event) {
      if(this.$store.state.editor.bulk_edit)
        this.$store.commit('update_items', { key: 'textcolor', val: event.hex })
      else
        this.$store.commit('update_item', { key: 'textcolor', val: event.hex })
    }
  }
};
</script>

<style>
</style>
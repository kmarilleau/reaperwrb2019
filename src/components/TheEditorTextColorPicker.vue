<template>
  <div class="app-text-color-picker">
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
    updateValue: function(event) {
      this.$store.commit('update_item', { key: 'textcolor', val: event.hex })
    }
  }
};
</script>

<style scoped>
.app-text-color-picker {
  width: inherit;
}
.vc-grayscale {
  width: 98%;
  background: none;
  margin: 0;
  padding: 5px;
  background: #f9f9f9;
}
</style>
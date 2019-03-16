<template>
  <div class="app-text-color-picker"
    v-if="this.$store.getters.editItemHasKey('textcolor') 
    || this.$store.getters.isEditorBulkEdit" 
  >
    <label>Text Color</label>
    <app-text-color-picker v-model="itemTextcolor" :palette="palette" @input="updateValue" />
  </div>
</template>

<script>
import { Grayscale } from "vue-color";

export default {
  data() {
    return {
      palette: ['#ffffff', '#E6E6E6', '#CCCCCC', 
                '#B3B3B3', '#999999', '#808080', 
                '#666666', '#595959', '#4D4D4D', 
                '#333333', '#0D0D0D', '#000000'],
    }
  },

  components: {
    "app-text-color-picker": Grayscale
  },

  computed: {
    itemTextcolor: {
      get() {
        return this.$store.getters.editItemKey('textcolor', '#222222')
      },
      set(value) {} 
    },
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
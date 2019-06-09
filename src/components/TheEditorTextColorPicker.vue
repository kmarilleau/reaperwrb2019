<template>
  <div class="app-text-color-picker"
    v-if="this.$store.getters.editItemHasKey('textcolor') || isEditorBulkEdit" 
  >
    <label>Text Color</label>
    <app-text-color-picker v-model="itemTextcolor" :palette="palette" @input="updateValue" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Grayscale } from 'vue-color'

export default {
  data() {
    return {
      palette: [
        '#ffffff', '#E6E6E6', '#CCCCCC', 
        '#B3B3B3', '#999999', '#808080', 
        '#666666', '#595959', '#4D4D4D', 
        '#333333', '#0D0D0D', '#000000'
      ],
    }
  },

  components: {
    "app-text-color-picker": Grayscale
  },

  computed: {

    ...mapGetters([
      'isEditorBulkEdit'
    ]),

    itemTextcolor: {
      get() {
        return this.$store.getters.editItemKey('textcolor', '#222222')
      },
      set(value) {} 
    },
  },

  methods: {

    ...mapMutations([
      'updateItems',
      'updateItem'
    ]),

    updateValue(event) {
      if(this.isEditorBulkEdit)
        this.updateItems({ key: 'textcolor', val: event.hex })
      else
        this.updateItem({ key: 'textcolor', val: event.hex })
    }
  }
};
</script>
<template>
  <div class="app-editor-slider-itemwidth-container"
    v-if="this.$store.getters.showEditorGlobalColumns"
  >
    <label>Item Width</label>
      <app-editor-slider
        v-model="globalColumns"
        :min="4" 
        :max="10" 
        :width="400" :piecewise="true"
      />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  components: {
    'app-editor-slider': VueSlider
  },

  computed: {
    globalColumns: {
      get() {
        return this.$store.getters.globalColumns
      },
      set(value) {
        this.$store.commit('setGlobalColumns', value)
      }
    },
  }
}
</script>
<template>
  <div class="app-icon-picker" v-once></div>
</template>

<script>
import { fontawesomeiconpicker } from 'fontawesome-iconpicker'
import $ from 'jquery'

export default {
  props: ['toggle'],

  mounted() {
    let self = this
    $(this.$el).iconpicker({
      templates: {
        iconpickerItem: '<span class="iconpicker-item"><i></i></span>'
      }
    })
    $(this.$el).on('iconpickerSelected', function(event) {
      let f = event.iconpickerValue.substr(0, 3)
      let i = event.iconpickerValue.substr(7)
      let icon = [f, i]
      self.updateIcon(icon)
    })
  },

  methods: {
    updateIcon(icon) {
      if(!this.toggle)
        this.$store.commit('updateItem', { key: 'icon', val: icon })
      else
        this.$store.commit('updateItem', { key: 'toggleicon', val: icon })
    }
  }
}
</script>

<style scoped>
</style>
<template>
  <div class="app-icon-picker" v-once></div>
</template>

<script>
import { fontawesomeiconpicker } from 'fontawesome-iconpicker'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import $ from 'jquery'

library.add(fas, far, fab)

dom.watch()

export default {
  props: ['toggle'],

  mounted() {
    let self = this
    $(this.$el).iconpicker({
        
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

<style lang="scss">
@import "@/scss/Variables.scss";


</style>
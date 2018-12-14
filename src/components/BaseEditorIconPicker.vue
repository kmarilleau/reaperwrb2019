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
        this.$store.commit('update_item', { key: 'icon', val: icon })
      else
        this.$store.commit('update_item', { key: 'toggleicon', val: icon })
    }
  }
}
</script>

<style>
.iconpicker-container {
    margin: 10px 0 30px 0;
}
.iconpicker-search {
    line-height: 30px;
    border-radius: 3px;
    padding-left: 10px;
    width: 100%;
    margin-bottom: 5px; 
    border: 1px solid #424242;
}

.iconpicker-items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    height: 170px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    justify-items: center;
    background: #f0f0f0;
}

.iconpicker-item {
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 2px;
    text-align: center;
    border-radius: 2px;
    font-size: 150%;
    background: #dddddd;
    border: 1px solid #aaaaaa;
    opacity: 0.7;
}
.iconpicker-item * {
    justify-self: center;
    color: #525252;
}
.iconpicker-item:hover {
    background: #fff;
    opacity: 1;
}
</style>
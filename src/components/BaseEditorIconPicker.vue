<template>
  <div class="app-icon-picker">

    <input type="text" name="icon" @input="onSearch($event)" @keyup.enter="onKeyupEnter($event)">

    <div class="app-icon-picker-items">
      <span class="app-icon-picker-item"
        v-for="(icon, index) in search" :key="index"
        @click="onUpdateIcon(icon)"
      >
        <svgicon :icon="icon" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import reaperwrbIcons from '@/lib/reaperwrbIcons.js'

export default {
  props: ['toggle'],

  data() {
    return {
      icons: [],
      search: [],
    }
  },

  created() {
    this.icons = reaperwrbIcons
    this.search = this.icons
  },

  methods: {

    ...mapMutations([
      'updateItem'
    ]),

    onUpdateIcon(icon) {
      if(!this.toggle)
        this.updateItem({ key: 'icon', val: icon })
      else
        this.updateItem({ key: 'toggleicon', val: icon })
    },

    onSearch(event) {
      if(event.target.value !== '') {
        let search = event.target.value.toLowerCase()
        this.search = this.icons.filter(icon => {
          if(icon.includes(search)) 
            return icon
        })
      } else {
        this.search = this.icons
      }
    },

    onKeyupEnter(event) {
      event.target.blur()
    },
  }
}
</script>
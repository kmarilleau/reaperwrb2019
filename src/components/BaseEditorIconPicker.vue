<template>
  <div class="app-icon-picker">

    <input type="text" name="icon" @input="onSearch($event)">

    <div class="app-icon-picker-items">
      <span class="app-icon-picker-item"
        v-for="(icon, index) in search" :key="index"
        @click="onUpdateIcon(icon)"
      >
        <font-awesome-icon :icon="icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggle'],

  data() {
    return {
      icons: [],
      search: [],
    }
  },

  created() {
    this.icons = Object.keys(___FONT_AWESOME___.styles.fas).map(key => ['fas', key])
    this.search = this.icons
  },

  methods: {
    onUpdateIcon(icon) {
      if(!this.toggle)
        this.$store.commit('updateItem', { key: 'icon', val: icon })
      else
        this.$store.commit('updateItem', { key: 'toggleicon', val: icon })
    },

    onSearch(event) {
      if(event.target.value !== '') {
        this.search = this.icons.filter(icon => {
          if(icon[1].includes(event.target.value)) 
            return icon
        })
      } else {
        this.search = this.icons
      }
    }
  }
}
</script>

<style scoped>
</style>
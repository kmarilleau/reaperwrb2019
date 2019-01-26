<template>
  <div class="app-icon-picker" v-once>

    <div class="app-icon-picker-items">
      <span class="app-icon-picker-item"
        v-for="(icon, index) in icons" :key="index"
        @click="updateIcon(icon)"
      >
        <font-awesome-icon :icon="icon" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggle'],

  computed: {
    icons() {
      return Object.keys(___FONT_AWESOME___.styles.fas).map(key => ['fas', key])
    }
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
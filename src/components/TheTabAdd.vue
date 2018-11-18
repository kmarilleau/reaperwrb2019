<template>
  <div class="app-tab-add">
    <a @click.stop="onTabAdd"><font-awesome-icon icon="plus" size="1x" /></a>
  </div>
</template>

<script>
export default {
  methods: {
    onTabAdd: function(event) {
      this.$store.commit('add_tab')
    }
  }
}
</script>

<style scoped>
.app-tab-add a {
  display: block;
  width: 100%;
}
</style>
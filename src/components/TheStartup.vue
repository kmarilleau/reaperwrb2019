<template>
  <div class="app-startup">
    <!-- <div><img src="/static/icons/icon-96x96.png" /></div> -->
    <button class="pure-button pure-button-primary" 
      @click="onLaunchEditor()">Editor
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onLaunchEditor() {
      this.$store.commit('launchEditor')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
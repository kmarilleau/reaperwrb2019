<template>
  <div class="app-startup">
    <!-- <div><img src="/static/icons/icon-96x96.png" /></div> -->

    <button class="pure-button pure-button-primary" 
      @click="onLaunchEditor()">
      <span>Editor</span>
    </button>

    <template
      v-if="this.$store.state.has_local_storage && this.$store.state.local_storage.webremotes.length > 0"
    >
      <button
        v-for="(webremote,index) in this.$store.state.local_storage.webremotes" :key="index"
        @click.stop="onLoadLocal(webremote.label)"
      > 
        <span>Local: {{webremote.label}}</span>
      </button>
    </template>
   
  </div>
</template>

<script>
export default {
  methods: {
    onLaunchEditor() {
      this.$store.commit('launchEditor')
    },
    onLoadLocal(label) {
      this.$store.commit('skipStartup')
      this.$store.state.local_storage.webremotes.forEach((webremote, index) => {
        if(webremote.label === label)
          this.$store.commit('import', this.$store.state.local_storage.webremotes[index])
      })

      // FIXME handle fail case
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="app-container"
    :class="classContainerEditor()"
  >
    <app-view 
      :tabs="this.$store.state.tabs" 
      :tab="this.$store.state.active_tab"
    />
    <app-editor 
      v-if="this.$store.state.editor.enabled"
      :item="this.$store.state.editor.edit_item"
      :columns="this.$store.state.columns"
      :editor="this.$store.state.editor"
    />
  </div>
</template>

<script>
import TheView from '@/components/TheView.vue'
import TheEditor from '@/components/TheEditor.vue'

export default {
  components: {
    'app-view': TheView,
    'app-editor': TheEditor
  },

  // FIXME display loading bar or sth.
  mounted() {
    const div = document.getElementById('reaperwrb-json')
    if(typeof(div) !== 'undefined' && div !== null) {
      const json = JSON.parse(div.innerHTML)
      this.$store.replaceState(json)
    }
  },

  methods: {
    classContainerEditor() {
      return this.$store.state.editor.enabled ? 'app-container-editor' : false;
    }
  }
}
</script>

<style scoped>
</style>
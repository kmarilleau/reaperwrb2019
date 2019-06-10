<template>
  <div class="app-editor-menu"
    v-if="isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <span><svgicon icon="blocked" /> Cancel</span>
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onItemAdd('action')" class="pure-button app-editor-button-add">
      <span>Action</span>
    </button>
    <button @click.stop="onItemAdd('spacer')" class="pure-button app-editor-button-add">
      <span>Spacer</span>
    </button>
    <button @click.stop="onItemAdd('transport')" class="pure-button app-editor-button-add">
      <span>Transport</span>
    </button>
    <button @click.stop="onItemAdd('position')" class="pure-button app-editor-button-add">
      <span>Position</span>
    </button>
    <button @click.stop="onItemAdd('markers')" class="pure-button app-editor-button-add">
      <span>Markers</span>
    </button>
    <button @click.stop="onItemAdd('regions')"  class="pure-button app-editor-button-add">
      <span>Regions</span>
    </button>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isEditorModeAdd'
    ])
  },

  methods: {

    ...mapMutations([
      'setEditorModeMain'
    ]),
    
    ...mapActions([
      'onItemAdd'
    ]),

    onItemAdd(type) {
      // FIXME map as well?
      this.onItemAdd(type)
    },
    onCancel() {
      this.setEditorModeMain()
    },
  }
}
</script>
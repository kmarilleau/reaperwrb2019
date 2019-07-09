<template>
  <div class="app-editor__menu"
    v-if="isEditorModeAdd"
  >
    <button class="pure-button pure-button-secondary"
      @click.stop="onCancel">
      <span><svgicon icon="blocked" /> Cancel</span>
    </button>

    <div style="grid-column-start: span 5;"></div>

    <button @click.stop="onItemAdd('ACTION')" class="pure-button app-editor-button-add">
      <span>Action</span>
    </button>
    <button @click.stop="onItemAdd('SPACER')" class="pure-button app-editor-button-add">
      <span>Spacer</span>
    </button>
    <button @click.stop="onItemAdd('TRANSPORT')" class="pure-button app-editor-button-add">
      <span>Transport</span>
    </button>
    <button @click.stop="onItemAdd('POSITION')" class="pure-button app-editor-button-add">
      <span>Position</span>
    </button>
    <button @click.stop="onItemAdd('MARKERS')" class="pure-button app-editor-button-add">
      <span>Markers</span>
    </button>
    <button @click.stop="onItemAdd('REGIONS')"  class="pure-button app-editor-button-add">
      <span>Regions</span>
    </button>
    <button @click.stop="onItemAdd('TRACKSUTIL')" class="pure-button app-editor-button-add">
      <span>Sel. Tracks Nudge / Mute / Solo</span>
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
      'onEditorItemAdd'
    ]),

    onItemAdd(type) {
      this.onEditorItemAdd(type)
    },
    onCancel() {
      this.setEditorModeMain()
    },
  }
}
</script>
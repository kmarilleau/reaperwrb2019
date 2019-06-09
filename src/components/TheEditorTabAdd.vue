<template>
  <div class="app-tab-navigation-item app-tab-add"
    v-if="isModeEditor && !isEditorModeSave"
    :style="{
      width: itemWidth + 'px',
      'line-height': itemHeight / 2 + 'px'
    }"
  >
    <a @click.stop="onTabAdd">
      <svgicon icon="plus" />
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isModeEditor',
      'isEditorModeSave',
      'itemWidth',
      'itemHeight'
    ])
  },

  methods: {

    ...mapMutations([
      'hideHelp',
      'clearEditHighlight',
      'addTab'
    ]),

    onTabAdd(event) {
      // FIXME this should be one commit / action
      this.hideHelp()
      this.clearEditHighlight()
      this.addTab()
    }
  }
}
</script>
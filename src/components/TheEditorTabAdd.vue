<template>
  <div class="app-tab-navigation-item app-tab-add"
    v-if="isAppModeEditor && !isEditorModeSave"
    :style="{
      width: itemWidth + 'px',
      'line-height': itemHeight / 2 + 'px'
    }"
  >
    <a @click.stop="onAdd">
      <svgicon icon="plus" />
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'isAppModeEditor',
      'isEditorModeSave',
      'itemWidth',
      'itemHeight'
    ])
  },

  methods: {

    ...mapActions([
      'onTabAdd',
    ]),

    onAdd(event) {
      this.onTabAdd()
    }
  }
}
</script>
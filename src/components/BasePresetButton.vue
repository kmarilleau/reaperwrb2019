<template>
  <div class="app-preset-container"
    :style="getStyle()"
  >

    <template
      v-if="!this.delete"
    >
      <div class="app-preset-type">{{presetType}}</div>
      <button class="app-button-launch-preset"
        @click.stop="onLoad(title, timestamp, type)"
      >
        <svgicon icon="launch" />
        <span>{{title}}</span>
      </button>

      <div class="app-preset-edit-buttons"
        v-if="isEditorEnabled"
      >
        <a class="app-preset-edit-button-edit"
          @click.stop="onEdit(title, timestamp, type)"
        >
          <svgicon icon="edit" />
        </a>
        <a class="app-preset-edit-button-delete"
          @click.stop="onShowDelete()"
        >
          <svgicon icon="edit-delete" />
        </a>
      </div>

    </template>
    <template
      v-if="this.delete"
    >
      <div class="app-preset-buttons-delete">
        <button title="cancel" class="app-preset-cancel-button"
          @click.stop="onCancelDelete()"
        >
          <svgicon icon="blocked" /> <span>Cancel</span>
        </button>
        <button class="app-preset-delete-button"
          @click.stop="onDelete(title, timestamp, type)"
        >
          <svgicon icon="edit-delete-forever" /> <span>Confirm</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['title', 'type', 'timestamp'],

  data() {
    return {
      delete: false,
    }
  },

  computed: {

    ...mapGetters([
      'itemHeight',
      'itemWidth',
      'isEditorEnabled'
    ]),

    presetType() {
      if(this.type === 'json')
        return 'db'
      else
        return this.type
    }
  },

  methods: {

    ...mapMutations([
      'deleteWebremotePreset',
      'syncStorage'
    ]),

    getStyle() {
      let style = {}

      style.height = this.itemHeight + 'px'

      if(CSS.supports('display: grid'))
        style['min-width'] = this.itemWidth + 'px'
      else
        style['width'] = this.itemWidth + 'px'

      return style
    },

    onLoad(title, timestamp, type) {
      this.$store.dispatch('onLoadWebremotePreset', { title, timestamp, type })
    },

    onEdit(title, timestamp, type) {
      this.$store.dispatch('onEditWebremotePreset', { title, timestamp, type })
    },

    onShowDelete() {
      this.delete = this.delete ? false : true
    },

    onCancelDelete() {
      this.delete = false
    },

    onDelete(title, timestamp, type) {
      const payload = { title, timestamp, type }
      this.deleteWebremotePreset(payload)
      this.syncStorage(payload)
      this.delete = false
    },

  }
}
</script>
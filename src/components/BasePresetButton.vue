<template>
  <div class="app-preset-container">

    <template
      v-if="!this.delete"
    >
      <div class="app-preset-type">{{type}}</div>
      <button class="app-button-launch-preset"
        @click.stop="onLoad(title, timestamp, type)"
      >
        <svgicon icon="launch" />
        {{title}}
      </button>

      <div class="app-preset-buttons">
        <button class="pure-button-primary app-button-launch-editor"
          @click.stop="onEdit(title, timestamp, type)"
        >
          <svgicon icon="edit" />
        </button>
        <button class="pure-button-warning app-button-launch-editor"
          @click.stop="onShowDelete()"
        >
          <svgicon icon="edit-delete" />
        </button>
      </div>

    </template>
    <template
      v-if="this.delete"
    >
      <div class="app-preset-delete">
        <button class="pure-button-warning app-button-delete-preset app-editor-button"
          @click.stop="onDelete(title, timestamp, type)"
        >
          <svgicon icon="edit-delete-forever" /> Confirm
        </button>
        <button title="cancel" class="pure-button-secondary app-editor-button"
          @click.stop="onCancelDelete()"
        >
          <svgicon icon="blocked" /> Cancel
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['title', 'type', 'timestamp'],

  data() {
    return {
      delete: false,
    }
  },

  methods: {

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
      this.$store.commit('deleteWebremotePreset', payload)
      this.$store.commit('syncStorage', payload)
      this.delete = false
    },

  }
}
</script>

<style>
</style>
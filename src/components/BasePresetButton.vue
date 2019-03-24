<template>
  <div class="app-preset-container">

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

      <div class="app-preset-buttons"
        v-if="this.$store.getters.isEditorEnabled"
      >
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
        <button title="cancel" class="pure-button-secondary"
          @click.stop="onCancelDelete()"
        >
          <svgicon icon="blocked" /> <span>Cancel</span>
        </button>
        <button class="pure-button-warning app-button-delete-preset"
          @click.stop="onDelete(title, timestamp, type)"
        >
          <svgicon icon="edit-delete-forever" /> <span>Confirm</span>
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

  computed: {
    presetType() {
      if(this.type === 'json')
        return 'db'
      else
        return this.type
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
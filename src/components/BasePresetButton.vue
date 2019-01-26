<template>
  <div class="app-preset-container">

    <div class="app-preset-type">{{type}}</div>
    <template
      v-if="!this.delete"
    >
      <button class="app-button-launch-preset"
        @click.stop="onLoad(title, timestamp, type)"
      >
        <font-awesome-icon icon="external-link-alt" />
        {{title}}
      </button>
      <div class="app-preset-buttons">
        <button class="pure-button-primary app-button-launch-editor"
          @click.stop="onEdit(title, timestamp, type)"
        >
          <font-awesome-icon icon="pen" />
        </button>
        <button class="pure-button-warning app-button-launch-editor"
          @click.stop="onShowDelete()"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </template>
    <template
      v-if="this.delete"
    >
      <button class="pure-button-warning app-button-delete-preset"
        @click.stop="onDelete(title, timestamp, type)"
      >
        <font-awesome-icon icon="trash" />
      </button>
      <button title="cancel" class="pure-button-secondary app-editor-button"
        @click.stop="onCancelDelete()"
      >
        <font-awesome-icon icon="ban" />
      </button>
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
      this.$store.dispatch('onDeleteWebremotePreset', { title, timestamp, type })
      this.delete = false
    },

  }
}
</script>

<style>
</style>
<template>
  <div class="app-row-edit-buttons"
    v-if="this.$store.getters.showEditorEditButtons"
    :class="{ 'hidden': this.$store.getters.isEditorBulkEdit }"
  >
    <a class="app-row-edit-button app-row-edit-button-add"
      @click.stop="onShowItemAddMenu()" 
    >
      <svgicon icon="plus" />
      <span>Item</span>
    </a>
    <a class="app-row-edit-button app-row-edit-button-add app-add-row"
      @click.stop="onRowAdd()" 
    >
      <svgicon icon="plus" />
      <span>Row</span>
    </a>
    <a class="app-row-edit-button app-row-edit-button-delete"
      @click.stop="onRowDelete()"
      v-if="this.$store.getters.showEditorDeleteRowButton"
    >
      <svgicon icon="edit-delete" />
      <span>Row</span>
    </a>
  </div>
</template>

<script>

const bindHighlightEvent = (self) => {

  if(self.$store.getters.isModeEditor && typeof(self.$el.querySelectorAll) === 'function') {
    const el = self.$el.querySelectorAll('.app-row-edit-button')
    el.forEach(button => {
      if(!button.classList.contains('app-add-row')) {
        button.addEventListener('mouseenter', function(event) {
          event.target.parentElement.parentElement.classList.add('app-active-row')
        })

        button.addEventListener('mouseleave', function(event) { 
          event.target.parentElement.parentElement.classList.remove('app-active-row')
        })
      }
    })
  }
}

export default {
  props: ['row'],


  updated() {
    bindHighlightEvent(this)
  },

  mounted() {
    bindHighlightEvent(this)
  },

  methods: {

    onShowItemAddMenu(event) {
      this.$store.commit('hideHelp')
      this.$store.dispatch('onShowItemAddMenu', this.row)
    },

    onRowAdd(event) {
      this.$store.commit('addRow', this.row)
    },

    onRowDelete(event) {
      this.$store.commit('hideHelp')
      let payload = {
        obj: { type: 'row' },
        index: this.row,
        el: this.$parent.$children[0].$el
      }
      this.$store.dispatch('onDeleteRow', payload)
    }
  }
}
</script>

<style scoped>
</style>
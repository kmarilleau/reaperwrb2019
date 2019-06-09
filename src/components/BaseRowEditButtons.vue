<template>
  <div class="app-row-edit-buttons"
    v-if="showEditorEditButtons"
    :class="{ 'hidden': isEditorBulkEdit }"
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
      v-if="showEditorDeleteRowButton"
    >
      <svgicon icon="edit-delete" />
      <span>Row</span>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const bindHighlightEvent = (self) => {

  if(self.isModeEditor && typeof(self.$el.querySelectorAll) === 'function') {
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

  computed: {
    ...mapGetters([
      'showEditorEditButtons',
      'isEditorBulkEdit',
      'showEditorDeleteRowButton',
      'isModeEditor'
    ])
  },

  methods: {

    ...mapMutations([
      'hideHelp',
      'addRow',
      'onDeleteRow'
    ]),

    onShowItemAddMenu(event) {
      this.hideHelp()
      this.$store.dispatch('onShowItemAddMenu', this.row)
    },

    onRowAdd(event) {
      this.addRow(this.row)
    },

    onRowDelete(event) {
      this.hideHelp()
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
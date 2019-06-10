<template>
  <div class="app-row-edit-buttons"
    v-if="showEditorEditButtons"
    :class="{ 'hidden': isEditorBulkEdit }"
  >
    <a class="app-row-edit-button app-row-edit-button-add"
      @click.stop="onItemAddMenu()" 
    >
      <svgicon icon="plus" />
      <span>Item</span>
    </a>
    <a class="app-row-edit-button app-row-edit-button-add app-add-row"
      @click.stop="onAdd()" 
    >
      <svgicon icon="plus" />
      <span>Row</span>
    </a>
    <a class="app-row-edit-button app-row-edit-button-delete"
      @click.stop="onDelete()"
      v-if="showEditorDeleteRowButton"
    >
      <svgicon icon="edit-delete" />
      <span>Row</span>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

const bindHighlightEvent = (self) => {

  if(self.isAppModeEditor && typeof(self.$el.querySelectorAll) === 'function') {
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
      'isAppModeEditor'
    ])
  },

  methods: {

    ...mapMutations([
      'hideHelp',
      'rowAdd',
      'onEditorRowDelete'
    ]),

    ...mapActions([
      'onEditorItemAddMenu',
      'onEditorRowDelete'
    ]),

    onItemAddMenu(event) {
      this.onEditorItemAddMenu(this.row)
    },

    onAdd(event) {
      this.rowAdd(this.row)
    },

    onDelete(event) {
      this.hideHelp()
      let payload = {
        obj: { type: 'row' },
        index: this.row,
        el: this.$parent.$children[0].$el
      }
      this.onEditorRowDelete(payload)
    }
  }
}
</script>
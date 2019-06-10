<template>
  <div class="app-tab-navigation-item"
    :style="getStyle()"
    :class="{ 
      'app-tab-navigation-item-active' : isActiveTab(index),
      'app-highlight-edit' : isTabEdit(index),
      height: (itemHeight / 2) + 'px'
    }"
    @click.stop="onClick()"
    :tab="index"
  >
    <span class="app-item-label" 
      :style="{ 
        color: tab.textcolor,
      }"
    >
      {{tab.label}}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: [
    'tab',
    'index',
  ],

  mounted() {

    if(this.isAppModeEditor) {
      if(this.isEditTab({ index: this.index })) {
        this.editHighlight($el)
      }
    }
  },

  computed: {
    ...mapGetters([
      'isActiveTab',
      'isTabEdit',
      'itemHeight',
      'itemWidth',
      'isEditTab',
      'isAppModeEditor',
      'isEditorBulkEdit'
    ])
  },

  methods: {

    ...mapMutations([
      'editHighlight'
    ]),

    getStyle() {
      let style = { 
        backgroundColor: this.tab.bgcolor,
        'min-width': this.itemWidth + 'px',
        'line-height': this.itemHeight / 2 + 'px',
        'max-height': this.itemHeight / 2 + 'px',
      }

      if(!CSS.supports('display: grid'))
        style['width'] = this.itemWidth + 'px'
      else
        style['min-width'] = this.itemWidth + 'px'

      return style
    },

    onClick(event) {
      this.$store.dispatch('onSwitchTab', this.index)
      
      if(this.isAppModeEditor) {
        if(!this.isEditorBulkEdit) {
          const payload = {
            type: 'tab',
            index: this.index,
            el: this.$el,
          }
          this.$store.dispatch('onItemEdit', payload)
        }
      }
    }
  }
}
</script>
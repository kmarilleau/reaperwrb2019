<template>
  <div class="app-tab-navigation__item"
    :style="getStyle()"
    :class="{ 
      'app-tab-navigation__item--active' : isActiveTab(index),
      'app-highlight-edit' : isTabEdit(index),
      height: (itemHeight / 2) + 'px'
    }"
    @click.stop="onClick()"
    :tab="index"
  >
    <span class="app-item__label" 
      :style="{ 
        color: tab.textcolor,
      }"
    >
      {{tab.label}}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: [
    'tab',
    'index',
  ],

  mounted() {

    if(this.isAppModeEditor) {
      if(this.isEditTab({ index: this.index })) {
        this.editHighlight(this.$el)
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

    ...mapActions([
      'onTabSwitch',
      'onEditorItemEdit'
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
      this.onTabSwitch(this.index)
      
      if(this.isAppModeEditor) {
        if(!this.isEditorBulkEdit) {
          const payload = {
            type: 'tab',
            index: this.index,
            el: this.$el,
          }
          this.onEditorItemEdit(payload)
        }
      }
    }
  }
}
</script>
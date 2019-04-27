<template>
  <div class="app-tab-navigation-item"
    :style="getStyle()"
    :class="{ 
      'app-tab-navigation-item-active' : this.$store.getters.isActiveTab(index),
      'app-highlight-edit' : this.$store.getters.isTabEdit(index) 
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
export default {
  props: [
    'tab',
    'index',
  ],

  mounted() {

    if(this.$store.getters.isModeEditor) {
        if(this.$store.getters.isEditTab({ index: this.index })) {
          // FIXME commit
          this.$el.classList.add('app-highlight-edit')
          this.$store.state.editor.data.item.el = this.$el
        }
      }
  },

  methods: {

    getStyle() {
      let style = { 
        backgroundColor: this.tab.bgcolor,
        'min-width': this.$store.getters.itemWidth + 'px',
        'line-height': this.$store.getters.itemHeight / 2 + 'px',
        'max-height': this.$store.getters.itemHeight / 2 + 'px',
      }

      if(!CSS.supports('display: grid'))
        style['width'] = this.$store.getters.itemWidth + 'px'
      else
        style['min-width'] = this.$store.getters.itemWidth + 'px'

      return style
    },

    onClick(event) {
      this.$store.dispatch('onSwitchTab', this.index)
      
      if(this.$store.getters.isModeEditor) {
        if(!this.$store.getters.isEditorBulkEdit) {
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
};
</script>

<style scoped>
</style>
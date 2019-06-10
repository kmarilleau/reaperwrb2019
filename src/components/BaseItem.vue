<template>
  <div class="app-item"
    :class="getClass()"
    :style="getStyle()"
    @click="onClick()"
    :row="row"
    :index="index"
    :item="item"
  >

    <app-item__action 
      v-if="item.type === 'action'" 
      :item="item"
    />
    
    <app-item__transport 
      v-if="item.type === 'transport'" 
      :item="item" 
    />

    <app-item-position
      v-if="item.type === 'position'"
      :item="item"
    />

    <app-item__markers
      v-if="item.type === 'markers'"
      :item="item"
    />

    <app-item__regions
      v-if="item.type === 'regions'"
      :item="item"
    />

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BaseItemAction from '@/components/BaseItemAction.vue'
import BaseItemTransport from '@/components/BaseItemTransport.vue'
import BaseItemMarkers from '@/components/BaseItemMarkers.vue'
import BaseItemRegions from '@/components/BaseItemRegions.vue'
import BaseItemPosition from '@/components/BaseItemPosition.vue'

export default {
  props: ['row', 'item', 'index', 'toggle'],

  components: {
    'app-item__action': BaseItemAction,
    'app-item__transport': BaseItemTransport,
    'app-item__markers': BaseItemMarkers,
    'app-item__regions': BaseItemRegions,
    'app-item-position': BaseItemPosition,
  },
  
  mounted() {
    if(this.isAppModeEditor) {
      if(this.isEditItem({ item: this.item, row: this.row, index: this.index })) {
        this.editHighligh($el)
      }
    }
  },

  computed: {
    ...mapGetters([
      'isAppModeEditor',
      'isEditItem',
      'itemWidth',
      'itemHeight',
      'isAppModeRemote',
      'isEditorModeDelete',
      'isEditorModeSave',
      'isEditorBulkEdit'
    ])
  },

  methods: {

    ...mapMutations([
      'bulkEditAddRemove',
      'editHighlight'
    ]),

    ...mapActions([
      'onEditorItemEdit'
    ]),

    getStyle() {
      let style = { 
        backgroundColor: this.item.bgcolor, 
        gridColumnEnd: this.item.width ? 'span ' + this.item.width : 'span 1',
        height: this.getHeight(),
      }

      if(!CSS.supports('display: grid'))
        style['width'] = (this.itemWidth * this.item.width) + 'px'
      else
        style['min-width'] = (this.itemWidth * this.item.width) + 'px'

      return style
    },

    getClass() {
      const classList = {}
      classList['app-item-' + this.item.type] = true
      
      if(this.isAppModeRemote)
        classList['app-item__action--toggled'] = this.item.toggle && this.item.state > 0 ? true : false
      
      return classList
    },

    getHeight() {
      return this.itemHeight + 'px'
    },

    onClick() {
      if(this.isAppModeEditor 
      && !this.isEditorModeDelete
      && !this.isEditorModeSave) {

        const payload = {
          type: this.item.type,
          row: this.row,
          index: this.index,
          el: this.$el,
          obj: this.item
        }

        if(!this.isEditorBulkEdit)
          this.onEditorItemEdit(payload)
        else
          this.bulkEditAddRemove(payload)
      }
    },
  }
}
</script>
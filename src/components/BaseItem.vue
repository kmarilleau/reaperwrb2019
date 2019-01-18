<template>
  <div class="app-item"
    :class="getClass()"
    :style="{ 
      backgroundColor: item.bgcolor, 
      gridColumnEnd: item.width ? 'span ' + item.width : 'span 1' 
    }"
    @click="onClick()"
    :row="row"
    :index="index"
    :item="item"
  >

    <app-item-action 
      v-if="item.type === 'action'" 
      :item="item"
    />
    
    <app-item-transport 
      v-if="item.type === 'transport'" 
      :item="item" 
      :transport="this.$store.state.reaper.transport"
    />

    <app-item-position
      v-if="item.type === 'position'"
      :item="item"
      :transport="this.$store.state.reaper.transport"
    />

    <app-item-markers
      v-if="item.type === 'markers'"
      :item="item"
      :markers="this.$store.state.reaper.markers"
    />

    <app-item-regions
      v-if="item.type === 'regions'"
      :item="item"
      :regions="this.$store.state.reaper.regions"
    />

  </div>
</template>

<script>
import BaseItemAction from '@/components/BaseItemAction.vue'
import BaseItemTransport from '@/components/BaseItemTransport.vue'
import BaseItemMarkers from '@/components/BaseItemMarkers.vue'
import BaseItemRegions from '@/components/BaseItemRegions.vue'
import BaseItemPosition from '@/components/BaseItemPosition.vue'

export default {
  props: ['row', 'item', 'index', 'preview', 'toggle'],

  components: {
    'app-item-action': BaseItemAction,
    'app-item-transport': BaseItemTransport,
    'app-item-markers': BaseItemMarkers,
    'app-item-regions': BaseItemRegions,
    'app-item-position': BaseItemPosition,
  },

  methods: {
    getClass() {
      const classList = {}
      classList['app-item-' + this.item.type] = true
      classList['app-item-action-toggled'] = this.item.toggle && this.item.state > 0 ? true : false
      return classList
    },
    onClick() {
      if(this.$store.getters.isModeEditor) {
        if(!this.$store.getters.isEditorBulkEdit) {
          const payload = {
            item: this.item,
            row: this.row,
            index: this.index,
            el: this.$el,
          }
          this.$store.dispatch('onItemEdit', payload)
        } else {
          // FIXME handle add remove from bulk edit
        }
          
      }
    },
  }
}
</script>

<style>
</style>
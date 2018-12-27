<template>
  <div class="app-item"
    :class="getClass()"
    :style="{ 
      backgroundColor: item.bgcolor, 
      gridColumnEnd: item.width ? 'span ' + item.width : 'span 1' 
    }"
    :row="row"
    :index="index"
    :item="item"
  >
    <app-item-edit-buttons 
      :row="row" 
      :item="item" 
      :index="index" 
      :class="{ hidden: this.$store.state.editor.menu }"
    />

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
import BaseItemEditButtons from '@/components/BaseItemEditButtons.vue'
import BaseItemAction from '@/components/BaseItemAction.vue'
import BaseItemTransport from '@/components/BaseItemTransport.vue'
import BaseItemMarkers from '@/components/BaseItemMarkers.vue'
import BaseItemRegions from '@/components/BaseItemRegions.vue'
import BaseItemPosition from '@/components/BaseItemPosition.vue'

export default {
  props: ['row', 'item', 'index', 'preview', 'toggle'],

  components: {
    'app-item-edit-buttons': BaseItemEditButtons,
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
    }
  }
}
</script>

<style>
</style>
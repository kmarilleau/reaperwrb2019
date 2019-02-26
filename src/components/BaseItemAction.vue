<template>
  <a class="app-item-action-container"
    @click="onClick"
    :style="getStyle()"
  >

    <div class="app-item-label"
      v-if="parseInt(item.labelpos) === 1"
      :style="{ color: item.textcolor }"
    >
      <span>{{item.label}}</span>
    </div>

    <div class="app-item-action-icon"
      v-if="this.item.icon"
      :style="{
        color: this.item.textcolor,
      }"
    >
      <svgicon 
        :icon="itemIcon()" 
        :height="this.$store.getters.iconSize"
        :width="this.$store.getters.iconSize"
      />
    </div>

    <div class="app-item-label"
      v-if="parseInt(item.labelpos) === 0"
      :style="{ color: item.textcolor }"
    >
      <span
      :class="getClass()"
      >{{item.label}}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ['item'],

  methods: {

    onClick() {
      this.$store.commit('execAction', { action: this.item.action, toggle: this.item.toggle })
    },

    itemIcon() {
      if(!this.item.toggle)
        return this.item.icon
      else 
        return this.item.state > 0 && this.item.toggleicon ? this.item.toggleicon : this.item.icon
    },

    getStyle() {
      const style = {}

      if(this.item.icon !== false) {
        style['display'] = 'grid'
        if(parseInt(this.item.labelpos) === 1)
          style['grid-template-rows'] = '30% 70%'
        else
          style['grid-template-rows'] = '70% 30%'
      } else {
        style.display = 'flex'
        style['justify-content'] = 'center'
      }
      
      return style
    },

    getClass() {
      const classes = {}
      if(this.item.icon === false) {
        if(this.item.label.length === 1) {
          classes['font-bold'] = true
          classes['font-xxxl'] = true
        }

        else if(this.item.label.length < 3) {
          classes['font-bold'] = true
          classes['font-xxl'] = true
        }

        else if (this.item.label.length < 4) {
          classes['font-bold'] = true
          classes['font-xl'] = true
        }

        else if (this.item.label.length < 6)
          classes['font-l'] = true
      }

      return classes
    },
  },
}
</script>

<style scoped>
</style>
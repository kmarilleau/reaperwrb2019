<template>
  <a class="app-item__action__container"
    @click="onClick"
    :style="getStyle()"
  >

    <div class="app-item__label"
      v-if="parseInt(item.labelpos) === 1"
      :style="{ color: item.textcolor }"
    >
      <span>{{item.label}}</span>
    </div>

    <div class="app-item__action-icon"
      v-if="this.item.icon"
      :style="{
        color: this.item.textcolor,
        height: getIconHeight() + 'px',
        margin: '2px'
      }"
    >
      <svgicon 
        :icon="itemIcon()" 
        :height="getIconSize() + 'px'"
        :width="getIconSize() + 'px'"
      />
    </div>

    <div class="app-item__label"
      v-if="parseInt(item.labelpos) === 0"
      :style="{ 
        color: item.textcolor, 
        height: getLabelHeight() + 'px',
        'min-width': (itemWidth * this.item.width) - 4 + 'px',
        margin: '2px'
      }"
    >
      <span
      :class="getClass()"
      >{{item.label}}</span>
    </div>
  </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['item'],

  computed: {
    ...mapGetters([
      'itemWidth',
      'itemHeight',
      'iconSize'
    ])
  },

  methods: {

    ...mapMutations([
      'execAction'
    ]),

    onClick() {
      this.execAction({ action: this.item.action, toggle: this.item.toggle })
    },

    itemIcon() {
      if(!this.item.toggle)
        return this.item.icon
      else 
        return this.item.state > 0 && this.item.toggleicon ? this.item.toggleicon : this.item.icon
    },

    getIconHeight() {
      if(this.item.label !== '')
        return this.itemHeight / 2
      else
        return this.itemHeight
    },

    getIconSize() {
      if(this.item.label !== '')
        return this.iconSize
      else
        return (this.iconSize * 2 - 4)
    },

    getLabelHeight() {
      if(this.item.icon !== false)
        return this.itemHeight / 2
      else
        return this.itemHeight
    },

    getStyle() {
      const style = {}

      if(this.item.icon !== false) {
        if(parseInt(this.item.labelpos) === 1)
          style['grid-template-rows'] = '50% 50%'
        else
          style['grid-template-rows'] = '50% 50%'
      } else {
        style.display = 'flex'
        style['justify-content'] = 'center'
      }
      
      return style
    },

    getClass() {
      const classes = {}
      if(this.item.icon === false) {
        if(this.item.label.length <= 1 * this.item.width) {
          classes['font-bold'] = true
          classes['font-xxxl'] = true
        }

        else if(this.item.label.length <= 3 * this.item.width) {
          classes['font-bold'] = true
          classes['font-xxl'] = true
        }

        else if (this.item.label.length < 5 * this.item.width) {
          classes['font-bold'] = true
          classes['font-xl'] = true
        }

        else if (this.item.label.length < 6 * this.item.width)
          classes['font-l'] = true
      }

      return classes
    },
  },
}
</script>
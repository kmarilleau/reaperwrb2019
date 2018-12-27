<template>
  <a class="app-item-action-container"
    @click="onClick"
  >

    <div class="app-item-label"
      v-if="parseInt(item.labelpos) === 1"
      :style="{ color: item.textcolor }"
      :class="labelClass"
    >
      <span>{{item.label}}</span>
    </div>

    <div class="app-item-action-icon"
      :style="getStyle()"
    >
      <font-awesome-icon 
        v-if="item.icon"
        :icon="itemIcon()" size="4x"
        :style="{ color: this.item.textcolor }" 
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

      // simulate state changes in editor
      if(this.item.toggle && !this.$store.state.reaper.ready && this.$store.state.editor.enabled)
        this.item.state = this.item.state < 1 ? 1 : 0
      
      if(this.$store.state.reaper.ready) {
        this.$store.commit('execAction', this.item)
      }
    },

    itemIcon() {
      if(!this.item.toggle)
        return this.item.icon
      else 
        return this.item.state > 0 && this.item.toggleicon ? this.item.toggleicon : this.item.icon
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

        else if (this.item.label.length < 5) {
          classes['font-bold'] = true
          classes['font-xl'] = true
        }

        else if (this.item.label.length < 7)
          classes['font-l'] = true
      }

      return classes
    },

    getStyle() {
      const style = { }
      if(parseInt(this.item.labelpos) === 0) {
        style.margin = '1.5vh auto -1.5vh auto'
      } else {
        style.margin = 'auto auto 1.5vh auto'
      }
      return style
    }

  },
}
</script>

<style scoped>
</style>
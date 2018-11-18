<template>
  <div class="app-item-markers">
    <a class="app-item-marker" v-for="(marker, index) in this.$store.state.reaper.markers" 
      :key="index"
      :style="{ color: item.textcolor }"
      :marker="marker"  
      @click.stop="goToMarker(marker.id)"
    >
      <span>{{marker.id}}: {{marker.name}}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: ['item', 'markers'],

  methods: {
    goToMarker: function(id) {
      if(this.$store.state.reaper.ready)
        wwr_req('SET/POS_STR/m' + id)
    }
  },

  beforeMount: function() {
    if(this.$store.state.reaper.ready)
      wwr_req("MARKER")
  },

  beforeDestroy: function() {

  }
}
</script>

<style scoped>
.app-item-markers {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.app-item-marker {
  display: block;
  line-height: 30px;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  opacity: 0.5;
  margin: 2px 4px;
}

.app-item-marker span {
  margin-left: 10px;
}

.app-item-marker:hover {
  opacity: 1;
}
</style>

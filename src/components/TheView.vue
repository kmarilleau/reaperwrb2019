<template>
  <div class="app-view"
    :class="getClass()"
  >
    <template 
      v-if="this.$store.getters.hasTabs"
    >
      <app-tab-navigation />
      <app-tab />
    </template>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TheTabNavigation from '@/components/TheTabNavigation.vue'
import TheTab from '@/components/TheTab.vue'

export default {

  mounted() {
    if(this.isModeRemote)
      document.title = "ReaperWRB / " + this.webremoteTitle

    this.$store.commit('onWindowResize')
  },

  updated() {
    if(this.isModeEditor)
      this.onWindowResize()
  },

  computed: {
    ...mapGetters([
      'hasTabs',
      'webremoteTitle',
      'isModeEditor',
      'isModeRemote'
    ])
  },

  components: {
    'app-tab-navigation': TheTabNavigation,
    'app-tab': TheTab,
  },

  methods: {

    ...mapMutations([
      'onWindowResize'
    ]),

    getClass() {
      return { 'app-view-scroll' : this.isModeEditor }
    }
  }
}
</script>
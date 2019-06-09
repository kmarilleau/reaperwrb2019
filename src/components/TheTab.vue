<template>
  <div class="app-tab-rows">
    <template v-if="hasRows">
      <app-row
        v-for="(items, row) in rows" :key="row"
        :row="row"
      ></app-row>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseRow from '@/components/BaseRow.vue'

export default {  
  components: {
    'app-row': BaseRow
  },
  
  computed: {
    ...mapGetters([
      'hasRows',
      'rows'
    ])
  }
}
</script>
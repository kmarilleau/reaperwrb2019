<template>
  <div class="app-tab-rows">
    <template v-if="this.$store.getters.hasRows">
      <app-row
        v-for="(items, row) in this.$store.getters.rows" :key="row"
        :row="row"
      ></app-row>
    </template>
  </div>
</template>

<script>
import BaseRow from '@/components/BaseRow.vue';

export default {
  components: {
    'app-row': BaseRow
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="app-tab">
    <app-row
      v-if="rows.length > 0"
      v-for="(items, row) in rows" :key="row"
      :items="items"
      :row="row"
    ></app-row>
  </div>
</template>

<script>
import BaseRow from '@/components/BaseRow.vue';

export default {
  props: ['rows'],
  components: {
    'app-row': BaseRow
  }
};
</script>

<style scoped>
</style>
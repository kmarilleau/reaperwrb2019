<template>
  <div class="app-tab-rows">
    <template v-if="rows.length > 0">
      <app-row
        v-for="(items, row) in rows" :key="row"
        :items="items"
        :row="row"
      ></app-row>
    </template>
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
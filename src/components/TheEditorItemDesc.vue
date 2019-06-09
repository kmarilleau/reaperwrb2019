<template>
  <div class="app-editor-item-desc-container"
    v-if="editItemHasKey('desc') && editItemKey('desc', false) !== false"
  >
    <label>Action Description</label>
    <div class="app-item-desc">
      <div>{{itemDesc}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {

    ...mapGetters([
      'editItemHasKey',
      'editItemKey'
    ]),

    itemDesc() {
      return this.editItemKey('desc', '')
    },
  }
}
</script>
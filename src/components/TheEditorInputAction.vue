<template>
  <div class="app-editor-input-action-container"
    v-if="this.$store.getters.editItemHasKey('action')"
  >
    <div>
      <label>Search</label>
      <input type="text" id="search-action" name="search-action" 
        @keyup.enter="onSearchAction($event)"
        @keyup.delete="onSearchClear($event)"
      >
      <div class="app-editor-input-action-search-result"
        :class="{ hidden: this.search.length === 0 }"
      >
        <ul>
          <li v-for="(action, index) in search" :key="index"
            @click="onSelectAction(index)"
          >
            {{action[2]}}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <label>Action</label>
      <input type="text" id="item-action" name="item-action" v-model="itemAction">
    </div>
  </div>
</template>

<script>
import { ActionList } from '@/actions'

export default {

  data() {
    return {
      search: []
    }
  },

  computed: {

    actions() {
      return ActionList
    },

    itemAction: {
      get() {
        return this.$store.getters.editItemKey('action', '')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'action', val: value })
      }
    },

    itemDesc: {
      get() {
        return this.$store.getters.editItemKey('desc', '')
      },
      set(value) {
        this.$store.commit('updateItem', { key: 'desc', val: value })
      }
    },
  },
  
  methods: {

    onSearchAction(event) {
      if(event.target.value !== '') {
        let regexString = '.+' + event.target.value.toLowerCase().split(' ').join('.+') + '.+'
        let regex = new RegExp(regexString, 'g')
        this.search = ActionList.filter(action => {
          if(regex.test(action[2].toLowerCase()))
            return action
        })
        if(this.search.length > 0)
          event.target.blur()
      }
    },

    onSearchClear(event) {
      if(event.target.value === '')
        this.search = []
    },

    onSelectAction(index) {
      this.itemAction = this.search[index][1].toString()
      this.itemDesc = this.search[index][2]
      this.search = []
      this.$el.querySelector('#search-action').value = ''
    },
  }
}
</script>

<style>
</style>
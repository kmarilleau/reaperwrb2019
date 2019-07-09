<template>
  <div class="app-editor__input-action-container"
    v-if="editItemHasKey('action')"
  >
    <div>
      <label><svgicon icon="search" /> Search</label>
      <input type="text" id="search-action" name="search-action" 
        @keyup.enter="onSearchAction($event)"
        @keyup.delete="onSearchClear($event)"
      >
      <div class="app-editor__input-action-search-result"
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
      <input type="text" id="item-action" name="item-action" v-model="itemAction" 
        @keyup.enter="onKeyupEnter($event)"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ActionList } from '@/lib/actions'

export default {

  data() {
    return {
      search: []
    }
  },

  computed: {

    ...mapGetters([
      'editItemHasKey',
      'editItemKey'
    ]),

    actions() {
      return ActionList
    },

    itemAction: {
      get() {
        return this.editItemKey('action', '')
      },
      set(value) {
        this.updateItem({ key: 'action', val: value })
      }
    },

    itemDesc: {
      get() {
        return this.editItemKey('desc', '')
      },
      set(value) {
        this.updateItem({ key: 'desc', val: value })
      }
    },

    itemLabel: {
      get() {
        return this.editItemKey('label', '')
      },
      set(value) {
        return this.updateItem({ key: 'label', val: value })
      }
    },
  },
  
  methods: {

    ...mapMutations([
      'updateItem'
    ]),

    onSearchAction(event) {
      if(event.target.value !== '') {
        const isMidiAction = this.editItemKey('midi_editor', false)
        const regexString = '.*' + event.target.value.toLowerCase().split(' ').join('.+') + '.*'
        const regex = new RegExp(regexString, 'g')
        this.search = ActionList.filter(action => {
          if(!isMidiAction && action[0] === 'Main' && regex.test(action[2].toLowerCase()))
            return action
          else if(isMidiAction && action[0] === 'Midi' && regex.test(action[2].toLowerCase()))
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
      this.itemLabel = this.itemDesc
      this.search = []
      this.$el.querySelector('#search-action').value = ''
    },

    onKeyupEnter(event) {
      event.target.blur()
    },

  }
}
</script>
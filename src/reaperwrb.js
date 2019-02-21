export const modes = {
  STARTUP: 0,
  REMOTE: 1,
  EDITOR: 2,
}

export const editorModes = {
  MAIN: 0,
  ADD: 1,
  DELETE: 2,
  SAVE: 3,
}

export const defaults = {
  
  reaper: {
    ready: false,
    transport: {
      online: false,
      playstate: 0,
      position_seconds: 0,
      repeat: 0,
      position_string: '',
      position_string_beats: ''
    },
    markers: [],
    regions: [],
  },

  editor: {
    browser: 'chrome',
    mode: editorModes.MAIN,
    exec_actions: false,
    bulk_edit: false,
    active_row: 0,
    reload_timeout: 2000,
    help: false,
    data: {
      item: {
        type: false,
        row: false,
        obj: false,
        el: false
      },
      bulk: [],
      bin: {},
      move: false,
    }
  },

  storage: {
    webremotes: []
  },

  webremote: {
    title: 'new webremote',
    timestamp: null,
    columns: 8, // grid 
    itemHeight: 50, // px
    active_tab: 0,
    tabs: []
  },

  action: {
    type: 'action',
    label: 'new action',
    labelpos: 0,
    action: 0,
    state: -1,
    textcolor: '#FFFFFF',
    bgcolor: '#666666',
    toggle: false,
    icon: false,
    toggleicon: false,
    desc: '',
    width: 1,
    minwidth: 1,
  },

  spacer: {
    type: 'spacer',
    bgcolor: '#666666',
    width: 1,
    minwidth: 1,
  },

  tab: {
    type: 'tab',
    label: 'new tab',
    bgcolor: '#666666',
    textcolor: '#FFFFFF',
    rows: [],
  },

  transport: {
    type: 'transport',
    bgcolor: '#009CE0',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  position: {
    type: 'position',
    bgcolor: '#009CE0',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  markers: {
    type: 'markers',
    bgcolor: '#A4DD00',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  regions: {
    type: 'regions',
    bgcolor: '#AEA1FF',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  }
}

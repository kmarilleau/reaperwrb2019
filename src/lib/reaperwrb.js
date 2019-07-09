export const APP_MODES = {
  STARTUP: 0,
  REMOTE: 1,
  EDITOR: 2,
}

export const EDITOR_MODES = {
  MAIN: 0,
  ADD: 1,
  DELETE: 2,
  SAVE: 3,
}

export const APP_DEFAULTS = {
  
  REAPER: {
    ready: false,
    sync_interval: 2000,
    transport: {
      online: false,
      playstate: 0,
      position_seconds: 0,
      repeat: 0,
      position_string: '',
      position_string_beats: ''
    },
    markers: [],
    marker_idx: 0,
    regions: [],
    region_idx: 0,
    tracks: []
  },

  EDITOR: {
    browser: 'chrome',
    mode: EDITOR_MODES.MAIN,
    exec_actions: false,
    bulk_edit: false,
    active_row: 0,
    reload_timeout: 2000,
    help: false,
    enabled: false,
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

  STORAGE: {
    webremotes: []
  },

  WEBREMOTE: {
    title: 'new webremote',
    timestamp: null,
    columns: 8, // grid 
    itemHeight: 140, // px
    itemWidth: null,
    active_tab: 0,
    tabs: []
  },

  ACTION: {
    type: 'action',
    midi_editor: false,
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

  SPACER: {
    type: 'spacer',
    bgcolor: '#666666',
    width: 1,
    minwidth: 1,
  },

  TAB: {
    type: 'tab',
    label: 'new tab',
    bgcolor: '#666666',
    textcolor: '#FFFFFF',
    rows: [],
  },

  TRANSPORT: {
    type: 'transport',
    bgcolor: '#009CE0',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  POSITION: {
    type: 'position',
    bgcolor: '#009CE0',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  MARKERS: {
    type: 'markers',
    bgcolor: '#A4DD00',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  REGIONS: {
    type: 'regions',
    bgcolor: '#AEA1FF',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  },

  TRACKSUTIL: {
    type: 'tracksutil',
    bgcolor: '#7B64FF',
    textcolor: '#FFFFFF',
    width: 4,
    minwidth: 4,
  }
}

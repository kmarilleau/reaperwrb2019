const defaults = {
  
  action: {
    type: 'action',
    label: 'label',
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
  },

  tab: {
    type: 'tab',
    label: 'tab',
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

export default defaults
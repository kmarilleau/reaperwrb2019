const exampleJSON = [
    {
      label: "Main",
      bgcolor: "#42a5f5",
      rows: [
        [
          {
            action: "40295",
            desc: "View: Zoom out project",
            label: "zoom out project",
            bgcolor: "#515151",
            icon: "fa-arrows-alt",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40340",
            desc: "Track: Unsolo all tracks",
            label: "unsolo all tracks",
            bgcolor: "#ffa000",
            icon: "fa-hard-of-hearing",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40339",
            desc: "Track: Unmute all tracks",
            label: "unmute all tracks",
            bgcolor: "#d81b60",
            icon: "fa-hard-of-hearing",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40076",
            desc: "Record: Set record mode to time selection auto-punch",
            label: "auto-punch",
            bgcolor: "#e53935",
            icon: "fa-microphone",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40252",
            desc: "Record: Set record mode to normal",
            label: "normal",
            bgcolor: "#e53935",
            icon: "fa-microphone",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40491",
            desc: "Track: Unarm all tracks for recording",
            label: "unarm all tracks",
            bgcolor: "#e53935",
            icon: "fa-close",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40364",
            desc: "Options: Toggle metronome",
            label: "toggle metronome",
            bgcolor: "#515151",
            icon: "fa-clock-o",
            type: "action",
            toggle: true,
            textcolor: "#ffffff"
          },
          {
            action: "41819",
            desc: "Preroll: toggle preroll on record",
            label: "toggle preroll on record",
            bgcolor: "#e53935",
            icon: "fa-random",
            type: "action",
            toggle: true,
            textcolor: "#ffffff"
          },
          {
            action: "41818",
            desc: "Preroll: toggle preroll on play",
            label: "toggle preroll on play",
            bgcolor: "#8bc34a",
            icon: "fa-random",
            type: "action",
            toggle: true,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "_S&M_WNTGL5",
            desc:
              "SWS/S&M: Toggle show all floating FX for selected tracks",
            label: "show floating FX for tracks",
            bgcolor: "#2196f3",
            icon: "fa-window-restore",
            type: "action",
            toggle: true,
            textcolor: "#ffffff"
          },
          {
            action: "41882",
            desc: "View: Show monitoring FX chain",
            label: "monitoring FX chain",
            bgcolor: "#7cb342",
            icon: "fa-headphones",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "41885",
            desc: "Grid: Toggle framerate grid",
            label: "framerate grid",
            bgcolor: "#1e88e5",
            icon: "fa-film",
            type: "action",
            toggle: true,
            textcolor: "#ffffff"
          },
          {
            action: "40357",
            desc: "Track: Set to custom color...",
            label: "track color",
            bgcolor: "#424242",
            icon: "fa-paint-brush",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40704",
            desc: "Item: Set to custom color...",
            label: "item color",
            bgcolor: "#424242",
            icon: "fa-paint-brush",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ]
      ],
      type: "tab",
      index: 0,
      html: { 0: { jQuery1124003391947464681455: 1084 }, length: 1 },
      textcolor: "#ffffff"
    },
    {
      label: "Envelopes",
      bgcolor: "#7e57c2",
      sortIDs: [
        "#tab-1-sortable-0",
        "#tab-1-sortable-1",
        "#tab-1-sortable-2",
        "#tab-1-sortable-3"
      ],
      rows: [
        [
          {
            action: "41142",
            desc:
              "FX: Show/hide track envelope for last touched FX parameter",
            label: "last touched FX parameter",
            bgcolor: "#7e57c2",
            icon: "fa-area-chart",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "41576",
            desc:
              "Options: Envelope point selection follows time selection",
            label: "follow time selection",
            bgcolor: "#9575cd",
            icon: "fa-chain",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40648",
            desc: "Options: Add edge points when moving envelope points",
            label: "add edge points when moving",
            bgcolor: "#9575cd",
            icon: "fa-plus",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40089",
            desc: "Envelope: Delete all points in time selection",
            label: "delete all points in time selection",
            bgcolor: "#c2185b",
            icon: "fa-trash-o",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40887",
            desc: "Envelope: Reduce number of points...",
            label: "reduce number of points",
            bgcolor: "#c2185b",
            icon: "fa-minus",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40065",
            desc: "Envelope: Clear envelope",
            label: "clear envelope",
            bgcolor: "#c2185b",
            icon: "fa-trash-o",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40189",
            desc: "Envelope: Set shape of selected points to linear",
            label: "linear",
            bgcolor: "#8d6e63",
            icon: "fa-check",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40190",
            desc: "Envelope: Set shape of selected points to square",
            label: "square",
            bgcolor: "#8d6e63",
            icon: "fa-check",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40683",
            desc: "Envelope: Set shape of selected points to Bezier",
            label: "Bezier",
            bgcolor: "#8d6e63",
            icon: "fa-check",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40428",
            desc: "Envelope: Set shape of selected points to fast start",
            label: "fast start",
            bgcolor: "#8d6e63",
            icon: "fa-check",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40429",
            desc: "Envelope: Set shape of selected points to fast end",
            label: "fast end",
            bgcolor: "#8d6e63",
            icon: "fa-check",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ]
      ],
      type: "tab",
      index: 3,
      html: { 0: { jQuery1124003391947464681455: 1083 }, length: 1 },
      textcolor: "#ffffff"
    },
    {
      label: "Automation",
      bgcolor: "#9ccc65",
      sortIDs: [
        "#tab-2-sortable-0",
        "#tab-2-sortable-1",
        "#tab-2-sortable-2"
      ],
      rows: [
        [
          {
            action: "42024",
            desc:
              "Automation: Set all tracks automation mode to latch preview",
            label: "mode latch preview",
            bgcolor: "#8bc34a",
            icon: "fa-product-hunt",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40266",
            desc: "Automation: Set all tracks automation mode to latch",
            label: "mode latch",
            bgcolor: "#8bc34a",
            icon: "fa-mail-forward",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40090",
            desc: "Automation: Set all tracks automation mode to write",
            label: "mode write",
            bgcolor: "#8bc34a",
            icon: "fa-pencil",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "40086",
            desc: "Automation: Set all tracks automation mode to read",
            label: "automation mode read",
            bgcolor: "#8bc34a",
            icon: "fa-eye",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40087",
            desc: "Automation: Set all tracks automation mode to touch",
            label: "automation mode touch",
            bgcolor: "#8bc34a",
            icon: "fa-hand-pointer-o",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "40088",
            desc: "Automation: Set all tracks automation mode to trim/read",
            label: "automation mode trim/read",
            bgcolor: "#8bc34a",
            icon: "fa-sliders",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ],
        [
          {
            action: "42013",
            desc:
              "Automation: Write current values for actively-writing envelopes to time selection",
            label: "write to time selection",
            bgcolor: "#e91e63",
            icon: "fa-save",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "42014",
            desc:
              "Automation: Write current values for actively-writing envelopes from cursor to start of project",
            label: "write from cursor to start of project",
            bgcolor: "#e91e63",
            icon: "fa-arrow-left",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          },
          {
            action: "42015",
            desc:
              "Automation: Write current values for actively-writing envelopes from cursor to end of project",
            label: "write from cursor to end of project",
            bgcolor: "#e91e63",
            icon: "fa-arrow-right",
            type: "action",
            toggle: false,
            textcolor: "#ffffff"
          }
        ]
      ],
      type: "tab",
      index: 2,
      html: { 0: { jQuery1124003391947464681455: 1081 }, length: 1 },
      textcolor: "#ffffff"
    }
  ]

export default exampleJSON
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #0f0f0f;
}

a, p, span, svg, div, img, input, button {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

button, input {
  border: 1px solid #424242;
  border-radius: 3px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f0f0f0;
}

#reaperwrb-json {
  display: none;
}

.app-container {
  display: grid;
  grid-template-rows: 1fr;
}

.app-container-editor {
  grid-template-columns: 1024px auto;
}

::-webkit-scrollbar {
  width: 12px;
}
 
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(68, 68, 68); 
  border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(68, 68, 68); 
}

.hidden { display: none !important; }

.sortable-ghost {
  opacity: 0.7;
}

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}

.app-highlight-edit[class*="app-item"],
.app-highlight-edit[class*="app-tab-navigation-item"] {
  animation: blinker 1s linear infinite;
}

.app-highlight-delete[class*="app-item"],
.app-highlight-delete[class*="app-tab"] {
  animation: blinker 1s linear infinite;
  background: #cdcdcd !important;
  opacity: 1  !important;
}

.app-highlight-delete[class*="app-row"] * {
  animation: blinker 1s linear infinite;
  background: #cdcdcd !important;
}

.app-editor {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3fr 4fr;
}
label {
  font-weight: bold;
  color: #cdcdcd;
}
.app-editor-menu {
  grid-column-start: 1;
  grid-column-end: 3;
}
.app-editor-panel {
  margin: 10px 20px 10px 20px;
}
.app-editor button { 
  cursor: pointer;
}
.app-editor button:hover {
  background-color: #f0f0f0 !important;
}
.app-editor button,
.app-editor .app-item-desc,
.app-editor input {
  line-height: 40px;
  padding: 0 10px 0 10px;
  border-radius: 3px;
}

.app-editor button.app-editor-icon-delete {
  position: absolute;
  margin: 40px;
}

.app-editor input[type=text] {
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  outline: none;
}
 
.app-editor input[type=text]:focus, textarea:focus {
  box-shadow: 0 0 10px rgb(255, 70, 70);
  border: 1px solid rgba(255, 70, 70, 1);
}

.app-item-desc {
  background-color: #cdcdcd;
  color: #0f0f0f;
  width: 95%;
  font-size: 0.8125em;
  line-height: 150%;
}
.app-editor input[type=text] {
  width: 95%;
}
.app-editor label {
  display: block;
  margin: 10px 0;
}
.app-editor-checkbox {
  height: 25px;
  width: 25px;
  margin: 0;
  padding: 0;
}
.app-editor .vue-slider-component {
  margin-top: 30px !important;
}
.app-reaper-status-offline * {
  color: #ff2828;
  margin: auto;
  height: 20px;
}
.app-view {
  width: 100%;
}

.app-view-scroll {
  height: 100vh;
  overflow-y: scroll;
}

.app-row,
.app-tab-navigation {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.app-item,
.app-tab-navigation-item {
  margin: 2px;
  cursor: pointer;
  border-radius: 3px;
}

.app-item { height: 160px; }

.app-item-action-preview {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  background: #191919;
  border-radius: 5px;
}

.app-item-action-preview .app-item-action {
  width: calc((1024px / 6) - 4px);
}

.app-item-transport {
  grid-column-end: span 4;
  height: calc(100vh/6);
}

.app-item-transport-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.app-item-transport-container a {
  width: calc(18% - 1%);
  text-align: center;
  line-height: calc(100vh / 6);
  font-size: 400%;
}

.app-item-transport-position {
  width: 30%;
  margin-left: 2%;
  text-align: left;
  line-height: calc(100vh / 6);
  font-size: 400%;
}

.app-item-markers {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  height: calc(100vh/6);
  overflow-y: scroll;
}

.app-tab-navigation-item {
  line-height: 30px;
}

.app-tab-add {
  text-align: center;
  margin: 2px;
  height: 30px;
  line-height: 30px;
}

.app-row {
  min-height: 160px; /* FIXME */
}

.app-row-edit-buttons {
  /* display: grid;
  justify-content: center; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4px;
  padding: 2px;
}

.app-row-edit-button {
  border-radius: 3px;
  background: #202020;
  padding: 2px 8px;
  text-align: center;
}

.app-row-edit-button span {
  font-size: 100%;
  margin-left: 10px;
}

.app-item-add,
.app-tab-add,
.app-row-edit-buttons {
  background: #191919;
  color: #424242;
  cursor: pointer;
  opacity: 0.5;
}
.app-item-add:hover,
.app-tab-add:hover,
.app-row-edit-buttons:hover {
  opacity: 1;
}

.app-item-add:hover,
.app-tab-add:hover,
.app-row-edit-button:hover {
  color: #f0f0f0;
}

.app-item-action-label,
.app-item-tab-label {
  margin: 0 10px;
}

.app-item-action-container {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.app-item-action-icon {
  margin: 20px auto 10px auto;
}

.app-item-action-label {
  text-align: center;
  justify-self: center;
  margin: auto 10px;
}

.vc-compact-color-item,
.vc-grayscale-color-item {
  width: 26px !important;
  height: 26px !important;
  margin: 1px !important;
}
</style>
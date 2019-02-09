<template>
  <div class="app-help-container">
    <div class="app-help">

      <header>
        <h1>ReaperWRB {{version}}</h1>
      </header>
      <section>
        <h2>Getting Started</h2>
        <p>
          Creating your own Reaper Web Remote Pages with ReaperWRB is really easy!
        </p>
        <p>
          The buttons on the right allow you to:
          Create a new web remote page from scratch and add all the actions / modules you need using the 1st button.
          Load a example web remote we've prepared which already contains some useful actions that you can build upon.
          Load a HTML file to import and update an already existing web remote that you have created using ReaperWRB.
          Import actions from REAPER toolbar configuration files that you have exported from Reaper
          </ul>
        </p>
        <p>
          In the editor you can add new tabs, rows or items to the web remote page using the various <font-awesome-icon class="app-help-icon" icon="plus" /> buttons.
          Items can be actions that are executed in reaper, spacers for layouting and various modules, like transport, position, marker and regions.
        </p>
        <p>
          Tabs, as well as items can be configured in various ways. To edit a tab or item simply mouse over it and click the pen icon <font-awesome-icon class="app-help-icon" icon="pen" />.
        </p>
        <p>
          Items, and tabs can be sorted and re-ordered by dragging and dropping them to their desired locations.
          Items can also be dropped onto a different tab which will then blink to indicate that the item will be moved to this tab. 
        </p>
        <p>
          To delete a tab, row or item simple click the trash icon <font-awesome-icon class="app-help-icon" icon="trash" />.
          While deleting tabs or rows you can choose to keep items. This will delete the tab/row but move all items to the next available tab/row. 
        </p>
        <p>
          The editor also features a "Bulk Edit" edit mode which allows you to edit and delete multiple items at once.
        </p>
        <h2>Adjusting the Global Layout</h2>
        <p>
          ReaperWRB webremotes use a grid based layout to position all items. You can adjust the global "Grid Columns" setting from 4 to 10, and set the width of individual items to
          values in that global range. 
        </p>
        <p>
          Less columns work better for small devices like mobile phones, and more columns for devices with bigger screens like tablets or desktop computers.
        </p>
        <h2>Saving And Installation</h2>
        <p>
          ReaperWRB provides 3 methods of saving webremots.
        </p>
        <h3><font-awesome-icon icon="globe" /> Local Storage</h3>
        <p>
          You can save the webremote in the local storage of your browser and they will be instantly available from the start screen.
        </p>
        <p>
          Keep in mind however that the webremotes are lost if you clear the cache of your browser!
        </p>
        <h3><font-awesome-icon icon="code" /> HTML</h3>
        <p>
          When you save a webremote as HTML, make sure to save the resulting file into the <em>reaper_www_root</em> folder.
          You can then access your webremote from http://rc.reaper.fm/[filename].html.
        </p>
        <h3><font-awesome-icon icon="hdd" /> JSON</h3>
        <p>
          Saving to JSON will prompt you to downloade a json.js file. This file has to be saved to <em>reaper_www_root/reaperwrb/</em> folder
          overwriting any existing json.js file (same goes for deleting)! 
        </p>
        <p>
          These webremotes will be accessible across all devices accessing the ReaperWRB startup page.
        </p>
        <h2>Add To Homescreen</h2>
        <p>
          ReaperWRB now supports the "Add To Homescreen" feature of Safari on iOS devices as well as Chrome/Edge on Android. This will allow you to place a bookmark
          on your device and open the webremote in fullscreen mode.
        </p>
      </section>
      <div class="app-help-footer">
        &copy; 2019 - 2119 Michael Klier
        <div class="app-help-social">
          <a href="https://m-klier.de" target="_blank"><font-awesome-icon icon="globe" /></a>
          <a href="https://twitter.com/michael_klier" target="_blank"><font-awesome-icon :icon="['fab', 'twitter-square']" /></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['version']
}
</script>
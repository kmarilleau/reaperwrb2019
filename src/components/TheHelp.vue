<template>
  <div class="app-help">
    <div class="app-help-container">
      <header>
        <h1>ReaperWRB {{version}}</h1>
        <img src="/reaperwrb/icons/icon-96x96.png" />
      </header>
      <section>
        <h2>Getting Started</h2>
        <p>
          Creating your own Reaper Web Remote Pages with ReaperWRB is really easy!
        </p>
        <p>
          The buttons on the right allow you to:
          <div class="app-help-tip app-help-button-new">Create a new web remote page from scratch and add all the actions / modules you need using the 1st button.</div>
          <div class="app-help-tip app-help-button-example">Load a example web remote we've prepared which already contains some useful actions that you can build upon.</div>
          <div class="app-help-tip app-help-button-html">Load a HTML file to import and update an already existing web remote that you have created using ReaperWRB.</div>
          <div class="app-help-tip app-help-button-toolbar">Import actions from REAPER toolbar configuration files that you have exported from Reaper</div>
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
          When you save a webremote, make sure to save the resulting file into the <em>reaper_www_root</em> folder.
          If you haven't already, configure a new web remote in REAPER's control surface setting and select the saved <em>.html</em> of your webremote as default page.
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
          <a href="https://m-klier.de" target="_blank"><i class="fas fa-home"></i></a>
          <a href="https://twitter.com/michael_klier" target="_blank"><i class="fab fa-twitter-square"></i></a>
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
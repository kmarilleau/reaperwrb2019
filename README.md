# reaperwrb

## About
This is the git repository of the ReaperWRB 2.0 (Reaper Web Remote Builder).

It's a Reaper webremote that allows for creating custom webremotes directly from the browser.

Going forward this project will be OpenSource and licensed unter the GNU GPLv3, see COPYING.txt.

You're allowed to build upon this code, change it and re-distribute it as long as you distribute the source code too.

I'm no longer providing support or guidance as to how to setup this repository. If you're familiar with npm/vue it
should be pretty straight forward.

When I started this project I was pretty new to vuejs, and the code shows. I would probably set this up differently today. 
Especially when it comes to the large store object. Ideally this should probably be split up and made more modular.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification outputs to dist/
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Builds
You'll find the latest version pre-build inside the "release" folder of this repository.

## Installation And Usage
For detailed installation and usage instructions please refer to the following youtube playlist:

https://www.youtube.com/watch?v=SDABt0Cm9wQ&list=PL4mhaIEnflCCwJE0iqY6D1ukgEt9mtXsC

## Icons

In the project folder you'll find two .gvdesign documents. We used Gravit Designer to create/author the SVG icons
to make it compatible with the js library we used to include them in vue.

To add icons place the .svg files in ~/svg-icons and run:

```
npm generate-icons
```

After the script finishes you have to manually add the icon names (filename) to ~/src/lib/reaperwrbicons.js

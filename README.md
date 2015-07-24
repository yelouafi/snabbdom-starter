# snabbdom-starter

[![Join the chat at https://gitter.im/yelouafi/snabbdom-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yelouafi/snabbdom-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple snabbdom starter repository. Using the following tools:

- browserify/watchify for client side bundling
- babel to transpile the ES6 code

# Getting up and running

Install

After cloning the repository, run `npm install`. 

All files live inside the `app` folder

..app  
.....index.html  
.....build.js  
...js  
........main.js  
........(...)  

running `npm run watch` watches for change and creates the browser bundle 'build.js'
If you want to manually build the bundle, run `npm run build`.

# Hello world

```javascript
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);


var vnode = h('div', {style: {fontWeight: 'bold'}}, 'Hello world');
patch(document.getElementById('placeholder'), vnode);
```
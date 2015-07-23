"use strict";

import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);


function view(currentDate) { 
  return h('div', 'Current date ' + currentDate); 
}

var oldVnode = document.getElementById('placeholder');
function updateDOM(newVnode) {
  oldVnode = patch(oldVnode, newVnode);
}

setInterval( () => {
  const newVnode = view(new Date());
  updateDOM(newVnode);  
}, 1000);


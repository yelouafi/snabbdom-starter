"use strict";

import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);


function view(name) { 
  return h('div', [
    h('input', {
      props: { type: 'text', placeholder: 'Type a your name' },
      on   : { input: onInput }
    }),
    h('hr'),
    h('div', 'Hello ' + name)
  ]); 
}

var oldVnode = document.getElementById('placeholder');

function onInput(event) {
  const newVnode = view(event.target.value);
  oldVnode = patch(oldVnode, newVnode);
}


oldVnode = patch(oldVnode, view(''));
"use strict";

import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

const patch = snabbdom.init([                 // Init patch function with choosen modules
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);

let oldVnode;

function domElm(selOrElm) {
  if(selOrElm instanceof Element)
    return selOrElm;
  if(typeof selOrElm === 'string') {
    const elm =  document.querySelector(selOrElm);
    if(!elm)
      throw "Argument must be either a DOM Element or a valid selector";
    return elm;
  } else
    throw "Argument must be either a DOM Element or a valid selector";
}

export default {
  h,
  patch,
  mount  : (vnode, selOrElm) => oldVnode = patch(domElm(selOrElm), vnode),
  update : newVnode => oldVnode = patch(oldVnode, newVnode)
};


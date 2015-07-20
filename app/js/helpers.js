"use strict";

import snabbdom from 'snabbdom';

const defaultModules = [
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
];


function domElm(selOrElm) {
  const elm =  selOrElm instanceof Element ? selOrElm : document.querySelector(selOrElm);
    
  if(!elm)
    throw "Argument must be either a DOM Element or a valid selector";
  return elm;
}



export default function patch(selOrElm, modules = defaultModules) {
  
  const _patch = snabbdom.init(modules);
  let acc = domElm(selOrElm);
  
  return function(vnode) {
    acc = _patch(acc, vnode);
  };
}

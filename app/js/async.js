"use strict";

import h from 'snabbdom/h';
import asyncMessage from './asyncMessage';

const INIT = Symbol('INIT');

const msg = asyncMessage();

// model : { message: String, pending: Number }
function view(model, handler) { 
  
  return h('div', [
    h('button', {
      hook : msg.hook(handler), 
      on   : { click: () => msg.start(handler, cb => setTimeout(() => cb('Hello async'), 2000)) }
    }, 'Get Async Message'),
    
    h('span', {
      style: { display: model.pending ? 'inline' : 'none' }
    }, 'Waiting response...'),
    h('div', `Message : ${model.message}`),
  ]); 
}


function update(model, action) {
  return  action.type === INIT            ? { message: '', pending: 0 }
        : action.type === msg.ASYNC_START ? {...model, pending: model.pending + 1 }
        : action.type === msg.ASYNC_END   ? { message: action.data, pending: model.pending - 1 }
        : model;
}

export default { view, update, actions : { INIT } }
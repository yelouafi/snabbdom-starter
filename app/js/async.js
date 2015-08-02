"use strict";

import h from 'snabbdom/h';

const INIT        = Symbol('INIT');
const ASYNC_START = Symbol('ASYNC START');
const ASYNC_END   = Symbol('ASYNC ASYNC');

var currentHandler;
function getAsyncMsg() {
  currentHandler({type: ASYNC_START});
  setTimeout(() => {
    currentHandler({ type: ASYNC_END, data: 'Hello async'});
  }, 2000);
}

// model : { message: String, pending: Number }
function view(model, handler) { 
  currentHandler = handler;
  return h('div', [
    h('button', {
      on   : { click: () => getAsyncMsg(handler) }
    }, 'Get Async Message'),
    
    h('span', {
      style: { display: model.pending ? 'inline' : 'none' }
    }, 'Waiting response...'),
    h('div', `Message : ${model.message}`),
  ]); 
}


function update(model, action) {
  return  action.type === INIT        ? { message: '', pending: 0 }
        : action.type === ASYNC_START ? {...model, pending: model.pending + 1 }
        : action.type === ASYNC_END   ? { message: action.data, pending: model.pending - 1 }
        : model;
}

export default { view, update, actions : { INIT, ASYNC_START, ASYNC_END } }
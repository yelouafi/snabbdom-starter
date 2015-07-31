"use strict";

import h from 'snabbdom/h';

const INIT        = Symbol('INIT');
const START_ASYNC = Symbol('START ASYNC');
const END_ASYNC   = Symbol('END ASYNC');

var currentHandler;
function getAsyncMsg(handler) {
  currentHandler({type: START_ASYNC});
  setTimeout(() => {
    currentHandler({ type: END_ASYNC, data: 'Hello async'});
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
        : action.type === START_ASYNC ? {...model, pending: model.pending + 1 }
        : action.type === END_ASYNC   ? { message: action.data, pending: model.pending - 1 }
        : model;
}

export default { view, update, actions : { INIT, START_ASYNC, END_ASYNC } }
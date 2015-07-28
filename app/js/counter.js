"use strict";

import h from 'snabbdom/h';
import Type from 'union-type';

const Action = Type({
  Increment : [],
  Decrement : [],
  Init      : [Number],
});


// model : Number
function view(count, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, Action.Increment()) }
    }, '+'),
    h('button', {
      on   : { click: handler.bind(null, Action.Decrement()) }
    }, '-'),
    h('div', `Count : ${count}`),
  ]); 
}


function update(count, action) {
  return  Action.case({
    Increment : () => count + 1,
    Decrement : () => count - 1,
    Init      : n  => n
  }, action);
}

export default { view, update, Action }
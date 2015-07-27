"use strict";

import h from 'snabbdom/h';

const INC = Symbol('inc');
const DEC = Symbol('dec');

// model : Number
function view(count, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, INC) }
    }, '+'),
    h('button', {
      on   : { click: handler.bind(null, DEC) }
    }, '-'),
    h('div', `Count : ${count}`),
  ]); 
}


function update(count, action) {
  return  action === INC ? count + 1
        : action === DEC ? count - 1
        : count;
}

export default { view, update, actions : { INC, DEC } }
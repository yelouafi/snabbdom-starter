"use strict";

import h from 'snabbdom/h';

const INC     = Symbol('inc');
const DEC     = Symbol('dec');
const INIT   = Symbol('init');


// model : Number
function view(count, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, { type: INC }) }
    }, '+'),
    h('button', {
      on   : { click: handler.bind(null, { type: DEC }) }
    }, '-'),
    h('div', `Count : ${count}`),
  ]); 
}


function update(count, action) {
  return  action.type === INC    ? count + 1
        : action.type === DEC    ? count - 1
        : action.type === INIT  ? action.data
        : count;
}

export default { view, update, actions : { INC, DEC, INIT } }
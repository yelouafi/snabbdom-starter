"use strict";

import h from 'snabbdom/h';

const INC     = Symbol('inc');
const DEC     = Symbol('dec');


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

function init() {
  return 0;
}


function update(count, action) {
  return  action.type === INC    ? count + 1
        : action.type === DEC    ? count - 1
        : count;
}

export default { view, init, update, actions : { INC, DEC } }
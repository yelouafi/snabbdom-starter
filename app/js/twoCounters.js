"use strict";

import h from 'snabbdom/h';
import counter from './counter';

const FIRST_ACTION  = Symbol('first');
const SECOND_ACTION = Symbol('second');
const RESET         = Symbol('reset');

// model : {first: counter.model, second: counter.model }
function view(model, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, {type: RESET}) }
    }, 'Reset'),
    h('hr'),
    counter.view(model.first, a => handler({ type: FIRST_ACTION, data: a})),
    h('hr'),
    counter.view(model.second, a => handler({ type: SECOND_ACTION, data: a})),
    
  ]); 
}

const resetAction = {type: counter.actions.INIT, data: 0};

function update(model, action) {
  return  action.type === RESET     ?
            { 
              first : counter.update(model.first, resetAction),
              second: counter.update(model.second, resetAction)
            }
        : action.type === FIRST_ACTION   ?
            {...model, first : counter.update(model.first, action.data) }
        : action.type === SECOND_ACTION  ?
            {...model, second : counter.update(model.second, action.data) }
        : model;
}

export default { view, update, actions : { FIRST_ACTION, SECOND_ACTION, RESET } }
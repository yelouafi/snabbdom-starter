"use strict";

import h from 'snabbdom/h';
import counter from './counter';

const UPDATE_FIRST  = Symbol('update first');
const UPDATE_SECOND = Symbol('update second');
const RESET         = Symbol('reset');

// model : {first: counter.model, second: counter.model }
function view(model, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, {type: RESET}) }
    }, 'Reset'),
    h('hr'),
    counter.view(model.first, a => handler({ type: UPDATE_FIRST, data: a})),
    h('hr'),
    counter.view(model.second, a => handler({ type: UPDATE_SECOND, data: a})),
    
  ]); 
}

function update(model, action) {
  return  action.type === RESET     ?
            { 
              first : counter.init(0),
              second: counter.init(0)
            }
            
        : action.type === UPDATE_FIRST   ?
            {...model, first : counter.update(model.first, action.data) }
            
        : action.type === UPDATE_SECOND  ?
            {...model, second : counter.update(model.second, action.data) }
            
        : model;
}

export default { view, update, actions : { UPDATE_FIRST, UPDATE_SECOND, RESET } }
"use strict";

import h from 'snabbdom/h';
import counter from './counter';

const ADD             = Symbol('add');
const COUNTER_ACTION  = Symbol('counter action');
const REMOVE          = Symbol('remove');
const RESET           = Symbol('reset');

/*  model : {
      counters: [{id: Number, counter: counter.model}],
      nextID  : Number
    }
*/
function view(model, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, {type: ADD}) }
    }, 'Add'), 
    h('button', {
      on   : { click: handler.bind(null, {type: RESET}) }
    }, 'Reset'),
    h('hr'),
    h('div.counter-list', model.counters.map(item => counterItemView(item, handler)))
    
  ]); 
}

function counterItemView(item, handler) {
  return h('div.counter-item', { key: item.id }, [
    h('button.remove', {
      on : { click: e => handler({ type: REMOVE, id: item.id})  }
    }, 'Remove'),
    counter.view(item.counter, a => handler({type: COUNTER_ACTION, id: item.id, data: a})),
    h('hr')
  ]);
}

const resetAction = {type: counter.actions.INIT, data: 0};

function addCounter(id) {
  return {id, counter: counter.update(null, resetAction) };
}

function update(model, action) {
  
  return  action.type === ADD ?
            { counters  : [...model.counters, addCounter(model.nextID)],
              nextID    : model.nextID + 1
            }
        : action.type === RESET ?
            { ... model, 
              counters: model.counters.map( item => 
                ({...item, counter: counter.update(item.counter, resetAction)})
              )
            }
        : action.type === REMOVE ?
            { ...model, 
              counters : model.counters.filter(item => item.id !== action.id)
            }
        : action.type === COUNTER_ACTION ?
            { ...model, 
              counters: model.counters.map( item => item.id !== action.id ? 
                  item
                : ({...item, counter: counter.update(item.counter, action.data)})
              )
            }
        : model;
}

export default { view, update, actions : { ADD, RESET, REMOVE, COUNTER_ACTION } }
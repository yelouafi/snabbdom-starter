"use strict";

import h from 'snabbdom/h';
import counter from './counter';

/*
  model : {
    counters: [{id: Number, counter: counter.model}],
    nextID  : Number
  }
*/

const ADD     = Symbol('add');
const UPDATE  = Symbol('update counter');
const REMOVE  = Symbol('remove');
const RESET   = Symbol('reset');

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
    counter.view(item.counter, a => handler({type: UPDATE, id: item.id, data: a})),
    h('hr')
  ]);
}

const resetAction = {type: counter.actions.INIT, data: 0};

function addCounter(model) {
  const newCounter = {id: model.nextID, counter: counter.update(null, resetAction) };
  return {
    counters  : [...model.counters, newCounter],
    nextID    : model.nextID + 1
  };
}

function resetCounters(model) {
  
  return {...model,
    counters  : model.counters.map(item => ({...item, 
      counter: counter.update(item.counter, resetAction)
    }))
  };
}

function removeCounter(model, id) {
  return {...model,
    counters : model.counters.filter( item => item.id !== id )
  };
}

function updateCounter(model, id, action) {
  return {...model,
    counters  : model.counters.map(item => 
      item.id !== id ? 
          item
        : { ...item, 
            counter : counter.update(item.counter, action)
          }
    )
  };
}


function update(model, action) {
  
  return  action.type === ADD     ? addCounter(model)
        : action.type === RESET   ? resetCounters(model)
        : action.type === REMOVE  ? removeCounter(model, action.id)
        : action.type === UPDATE  ? updateCounter(model, action.id, action.data) 
        : model;
}

export default { view, update, actions : { ADD, RESET, REMOVE, UPDATE } }
"use strict";

import h from 'snabbdom/h';
import Type from 'union-type';
import counter from './counter';

const Action = Type({
  Add     : [],
  Remove  : [Number],
  Reset   : [],
  Update  : [Number, counter.Action],
});


/*  model : {
      counters: [{id: Number, counter: counter.model}],
      nextID  : Number
    }
*/
function view(model, handler) { 
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, Action.Add()) }
    }, 'Add'), 
    h('button', {
      on   : { click: handler.bind(null, Action.Reset()) }
    }, 'Reset'),
    h('hr'),
    h('div.counter-list', model.counters.map(item => counterItemView(item, handler)))
    
  ]); 
}

function counterItemView(item, handler) {
  return h('div.counter-item', { key: item.id }, [
    h('button.remove', {
      on : { click: handler.bind(null, Action.Remove(item.id))  }
    }, 'Remove'),
    counter.view(item.counter, a => handler(Action.Update(item.id, a))),
    h('hr')
  ]);
}

const resetAction = counter.Action.Init(0);

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
  
  return Action.case({
    Add     : () => addCounter(model),
    Remove  : id => removeCounter(model, id),
    Reset   : () => resetCounters(model), 
    Update  : (id, action) => updateCounter(model, id, action)
  }, action);
}

export default { view, update, Action };
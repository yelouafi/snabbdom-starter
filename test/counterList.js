import test from 'tape';
import { update, actions } from '../app/js/counterList';
import { actions as counterActions } from '../app/js/counter';
import { action } from './helpers';


test('counter update function', (assert) => {
    
  var model = {nextID: 1, counters: []};
  
  const incCounter = action(counterActions.INC);
  const decCounter = action(counterActions.DEC);
  const reset = action(counterActions.INIT, 0);
  
  
  model = update(model, action(actions.ADD));
  model = update(model, action(actions.ADD));
  assert.deepEqual(model, {
    nextID: 3, 
    counters: [
      {id: 1, counter: 0}, 
      {id: 2, counter: 0}
  ]});
  
  model = update(model, { 
    type: actions.UPDATE, 
    id: 1,
    data: incCounter  
  });
  model = update(model, { 
    type: actions.UPDATE, 
    id: 2,
    data: decCounter  
  });
  assert.deepEqual(model, {
    nextID: 3, 
    counters: [
      {id: 1, counter: 1}, 
      {id: 2, counter: -1}
  ]});
 
  model = update(model, action(actions.RESET));
  assert.deepEqual(model, {
    nextID: 3, 
    counters: [
      {id: 1, counter: 0}, 
      {id: 2, counter: 0}
  ]});
  
  model = update(model, {type: actions.REMOVE, id: 1});
  assert.deepEqual(model, {
    nextID: 3, 
    counters: [
      {id: 2, counter: 0}
  ]});

  assert.end();
});

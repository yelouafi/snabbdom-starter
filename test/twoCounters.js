import test from 'tape';
import { update, actions } from '../app/js/twoCounters';
import { actions as counterActions } from '../app/js/counter';
import { action } from './helpers';


test('counter update function', (assert) => {
    
  var model = {first: 0, second: 0};
  
  const incCounter = action(counterActions.INC);
  const decCounter = action(counterActions.DEC);
  const reset = action(counterActions.INIT, 0);
  
  model = update(model, action(actions.FIRST_ACTION, incCounter));
  model = update(model, action(actions.SECOND_ACTION, decCounter));
  assert.deepEqual(model, {first: 1, second: -1});

  model = update(model, action(actions.RESET));
  assert.deepEqual(model, {first: 0, second: 0});

  assert.end();
});

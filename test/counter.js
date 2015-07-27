import test from 'tape';
import { update, actions } from '../app/js/counter';
import { action } from './helpers';

test('counter update function', (assert) => {
    
  var count = 10;
  count = update(count, action(actions.INC));
  assert.equal(count, 11);

  count = update(count, action(actions.DEC));
  assert.equal(count, 10);
  
  count = update(count, action(actions.INIT, 0));
  assert.equal(count, 0);

  assert.end();
});

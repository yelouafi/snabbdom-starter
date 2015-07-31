import test from 'tape';
import { init, update, actions } from '../app/js/counter';
import { action } from './helpers';

test('counter update function', (assert) => {
    
  var count = init();
  assert.equal(count, 0);
  
  count = update(count, action(actions.INC));
  assert.equal(count, 1);

  count = update(count, action(actions.DEC));
  assert.equal(count, 0);

  assert.end();
});

import test from 'tape';
import { update, actions } from '../app/js/counter';

test('counter update function', (assert) => {
    
  var count = 10;
  count = update(count, {type: actions.INC});
  assert.equal(count, 11);

  count = update(count, {type: actions.DEC});
  assert.equal(count, 10);

  assert.end();
});

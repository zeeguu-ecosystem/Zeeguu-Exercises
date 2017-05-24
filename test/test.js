import Test from 'tape';
import Bear from '../src/static/js/app/test_example/example.js';

Test('should growl', function (assert) {
  var bear = new Bear();
  var result = bear.growl();
  assert.equal(result, 'The any bear says grrr');
  assert.end();
})
/* global describe, it */
var assert = require('assert'),
    trim   = require('./');

describe('trimmer', function () {
  it('should trim whitespace from strings', function () {
    assert.equal(trim('    testing   '), 'testing');
    assert.equal(trim('\nnew lines\n'), 'new lines');
    assert.equal(trim('\t\ttabs\t\t'), 'tabs');
    assert.equal(trim('nothing to see'), 'nothing to see');
  });

  it('should trim arbitrary characters', function () {
    assert.equal(trim('testing', 'ing'), 'test');
    assert.equal(trim(' spaces ', 'spaces'), ' spaces ');
    assert.equal(trim('sums', 's'), 'um');
    // Supports array inputs
    assert.equal(trim('testing', ['i', 'n', 'g']), 'test');
    // Supports function inputs
    assert.equal(trim('testing', function () { return true; }), '');
  });

  it('should coerce arbitrary inputs', function () {
    assert.equal(trim(10, 1), '0');
  });

  describe('::left()', function () {
    it('should trim from the left', function () {
      assert.equal(trim.left('    testing   '), 'testing   ');
      assert.equal(trim.left('\t\n\t\ttabs and shit\n'), 'tabs and shit\n');
    });
  });

  describe('::right()', function () {
    it('should trim from the right', function () {
      assert.equal(trim.right('    testing   '), '    testing');
      assert.equal(trim.right('\t\n\t\ttabs and shit\n'), '\t\n\t\ttabs and shit');
    });
  });
});

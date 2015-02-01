/* jshint mocha: true */
var concat = require('concat-stream');
var expect = require('chai').expect;
var ArrayTransform = require('..');

var streamResult = function(array, callback) {
  var stream = new ArrayTransform();

  stream.pipe(concat(function(result) {
    callback(result.toString());
  }));

  array.forEach(function(element) {
    stream.write(element);
  });

  stream.end();
};

describe('sanity checks', function() {
  it('outputs nothing for an empty array', function(done) {
    streamResult([], function(result) {
      expect(result).to.equal('');
      done();
    });
  });

  it('round-trips an array of strings', function(done) {
    var array = ['a', 'b', 'c'];
    streamResult(array, function(result) {
      expect(result).to.equal(JSON.stringify(array));
      done();
    });
  });

  it('round-trips an array of objects', function(done) {
    var array = [{k: 'first', v: 1}, {k: 'second', v: 2}];
    streamResult(array, function(result) {
      expect(result).to.equal(JSON.stringify(array));
      done();
    });
  });
});

var Transform = require('stream').Transform;
var util = require('util');

function StringifyArrayTransform() {
  Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
  this.setEncoding('utf8');
  this._first = true;
}

util.inherits(StringifyArrayTransform, Transform);

var prototype = StringifyArrayTransform.prototype;

prototype._transform = function(object, encoding, callback) {
  if (this._first) {
    this.push('[');
    this._first = false;
  } else {
    this.push(',');
  }
  this.push(JSON.stringify(object));
  callback();
};

prototype._flush = function(callback) {
  if (!this._first) {
    this.push(']');
  }
  callback();
};

module.exports = StringifyArrayTransform;

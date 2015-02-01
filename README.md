stringify-array-transform.js
============================

[![NPM version](https://img.shields.io/npm/v/stringify-array-transform.svg)](https://www.npmjs.com/package/stringify-array-transform)
[![build status](https://img.shields.io/travis/kemitchell/stringify-array-transform.js.svg)](http://travis-ci.org/kemitchell/stringify-array-transform.js)

Trivial Transform wrapping `JSON.stringify` for `Array` output. Outputs nothing for an empty `Array`.

```javascript
var StringifyArrayTransform = require('stringify-array-transform');
require('http').createServer(function(request, response) {
  response.statusCode = 404;
  // ...
  .once('data', function() {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
  })
  .pipe(new StringifyArrayTransform())
  .pipe(response);
});
```

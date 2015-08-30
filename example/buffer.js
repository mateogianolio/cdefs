(function() {
  'use strict';

  var cdefs = require('../');

  // buffer.c borrowed from clibs/buffer
  console.log('example/buffer.c:');
  console.log(JSON.stringify(cdefs('./example/buffer.c'), null, '  '));
}());

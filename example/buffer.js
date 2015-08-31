(function() {
  'use strict';

  var fs = require('fs'),
      cdefs = require('../');

  // buffer.c borrowed from clibs/buffer
  console.log('example/buffer.c:');
  console.log(JSON.stringify(cdefs(fs.readFileSync('./example/buffer.c', 'utf8')), null, '  '));
}());

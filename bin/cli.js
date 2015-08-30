#!/usr/bin/env node

var fs = require('fs'),
    proto = require('../');

var args = process.argv;
if(args.length < 3) {
  console.log('Error: not enough arguments.');
  console.log('proto [-o output_file] [file1, [file2, [...]]]');
  return;
}

// ignore name and path
args.shift();
args.shift();

var list = {},
    len = args.length,
    arg,
    file;

while(args.length) {
  arg = args.shift();
  if(arg === '-o') {
    file = args.shift();
    continue;
  }

  if(!fs.existsSync(arg)) {
    console.log('Warning: file "' + arg + '" does not exist.');
    continue;
  }

  if(len > 1)
    list[arg] = proto(arg);
  else
    list = proto(arg);
}

if(file)
  fs.writeFileSync(file, JSON.stringify(list, null, '  '));
else if(Object.keys(list).length)
  console.log(JSON.stringify(list, null, '  '));

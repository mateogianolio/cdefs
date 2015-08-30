#!/usr/bin/env node

var fs = require('fs'),
    tags = require('../');

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

  if(args.length > 1)
    list[arg] = tags(arg);
  else
    list = tags(arg);
}

if(file)
  fs.writeFileSync(file, JSON.stringify(list));
else if(Object.keys(list).length)
  console.log(list);

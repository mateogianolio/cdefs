(function() {
  'use strict';

  /**
   * cdefs
   * Describe C function prototypes in JSON.
   * @param {String} src
   * @return {Object} tags
   **/
  module.exports = function(src) {
    // remove single- and multi-line comments
    src = src.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');

    // remove everything inside curly-braces { ... }
    src = src
      .replace(/(\{([\s\S]*?)\})|((  |    |\t)(.*)$)/gm, '')
      .replace(/\{|\}/g, '');

    var lines = src.split(/\n|\);|;/g);

    /**
     * filter preprocessor directives, empty lines
     * and variable declarations
     **/
    lines = lines.filter(function(line) {
      return line.length &&
             line.indexOf('#') !== 0 &&
             line.indexOf('=') === -1;
    });

    /**
     * if function declared on two lines, e.g.
     * void
     * foo() { ... }
     **/
    lines = lines.map(function(line, i, _lines) {
      var previous = _lines[i - 1];
      line = line.trim();
      if(previous && line.indexOf('(') !== -1 && previous.indexOf('(') === -1)
        return previous + ' ' + line;
      else if(line.indexOf('(') !== -1)
        return line;
    });

    // clean up
    lines = lines.filter(function(line) {
      return line &&
             (line
               .split(/ |\(/g)
               .shift()
               .match(/if|for|while/) || []).length !== 1;
    });

    var tags = {},
        name,
        type,
        args;
    lines.forEach(function(line, i, _lines) {
      args = line
        .match(/\((.*)\)/g)
        .join('');

      line = line
        .replace(args, '')
        .split(' ');

      name = line.pop();
      type = line.join(' ');

      args = args
        .replace(/\(|\)/g, '')
        .split(',')
        .map(function(arg) {
          return arg.trim();
        })
        .filter(function(arg) {
          return arg.length;
        })
        .map(function(arg) {
          var ptrCount = (arg.match(/\*|\[\]/g) || []).length,
              ptrs = '';
          for(var i = 0; i < ptrCount; i++)
            ptrs += '*';

          arg = arg
            .replace(/\*|\[|\]/g, '')
            .split(' ');

          return {
            type: arg.shift() + ptrs,
            name: arg.join(' ').trim()
          };
        });

      tags[name] = {
        returns: type,
        arguments: args
      };

      _lines[i] = line;
    });

    return tags;
  };
}());

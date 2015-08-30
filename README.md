# node-cproto

Extract function prototypes in C source files to JSON.

### Install

```bash
$ npm install cproto -g
```

### Usage

#### from command-line

```bash
$ proto [-o output_file] [file1, [file2, [...]]]
```

Inspect ```ex1.c``` and ```ex2.c``` and print prototypes to ```stdout```.

```bash
$ proto ex1.c ex2.c
{
  "ex1.c": {
    "main": {
      "returns": "int",
      "arguments": [
        "int argc",
        "char** argv"
      ]
    }
  },
  "ex2.c": {
    "test": {
      "returns": "float",
      "arguments": []
    },
    "print": {
      "returns": "void",
      "arguments": [
        "char * str"
      ]
    }
  }
}
```

Inspect ```ex2.c``` and save prototypes to ```ex2.json```:

```bash
$ proto ex2.c -o ex2.json
```

#### from your module

```javascript
var proto = require('cproto');
```

Get the prototypes for ```ex1.c```:

```javascript
var prototypes = proto('example.c');
```

### Contribute

Contributions are welcome.

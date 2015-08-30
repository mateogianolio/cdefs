# cdefs

Describe C function prototypes in JSON.

```c
const char* get_name(int id) {
  // ...
}
```
=>
```javascript
{
  "get_name": {
    "returns": "const char*",
    "arguments": [
      {
        "type": "int",
        "name": "id"
      }
    ]
  }
}
```


### Install

```bash
$ npm install cdefs -g
```

### Usage

#### from command-line

```bash
$ cdefs [-o output_file] [file1, [file2, [...]]]
```

Inspect ```ex1.c``` and ```ex2.c``` and print prototypes to ```stdout```.

```bash
$ cdefs ex1.c ex2.c
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
$ cdefs ex2.c -o ex2.json
```

#### from your module

```javascript
var cdefs = require('cdefs');
```

Get the prototypes for ```ex1.c```:

```javascript
var prototypes = cdefs('ex1.c');
```

### Contribute

Contributions are welcome.

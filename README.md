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
$ cdefs example/ex1.c example/ex2.c
{
  "ex1.c": {
    "main": {
      "returns": "int",
      "arguments": [
        {
          "type": "int",
          "name": "argc"
        },
        {
          "type": "char**",
          "name": "argv"
        }
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
        {
          "type": "char*",
          "name": " str"
        }
      ]
    }
  }
}
```

Inspect ```ex2.c``` and save prototypes to ```ex2.json```:

```bash
$ cdefs example/ex2.c -o ex2.json
```

#### from your module

```javascript
var cdefs = require('cdefs');
```

Get the prototypes for ```ex1.c```:

```javascript
var fs = require('fs'),
    src = fs.readFileSync('./example/ex1.c', 'utf8'),
    prototypes = cdefs(src);
```

### Contribute

Contributions are welcome.

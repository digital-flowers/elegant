# Trimmer

Trim any characters from either side of a string.

## Installation

```
npm install trimmer --save
```

## API

```javascript
var trim = require('trimmer');
```

* `trim(string [, characters])`
* `trim.left(string [, characters])`
* `trim.right(string [, characters])`

Please note: `characters` can be one of either an string, array or function.

```javascript
trim('  test  ') // 'test'
trim.left('  test  ') // 'test  '
trim.right('  test  ') // '  test'

trim('test', 't') // 'es'
trim('testing', 'ing') // 'test'
trim.left('test', 't') // 'est'
trim.right('test', 't') // 'tes'
```

## License

MIT

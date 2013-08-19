// By default we'll trim all whitespace characters
var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';

// Turn the input into a function, if it's a string or array input we turn it
// into an object to achieve constant time lookups
var toFn = function (str) {
  if (typeof str === 'function') { return str; }

  if (Array.isArray(str)) {
    str = str.join('');
  } else {
    str = String(str);
  }

  var obj = Object.create(null),
      i   = 0,
      char;

  while (char = str[i++]) {
    obj[char] = true;
  }

  return function (char) {
    return char in obj;
  };
};

// The default exported function trims both left and right of the string
var trim = module.exports = function (str, chars) {
  return trim.right(trim.left(str, chars), chars);
};

trim.left = function (str, chars) {
  var fn = toFn(chars || whitespace),
      i  = 0,
      char;

  str = String(str);

  while ((char = str[i]) && fn(char)) {
    i++;
  }

  return str.substr(i);
};

trim.right = function (str, chars) {
  var fn = toFn(chars || whitespace),
      i  = str.length - 1,
      char;

  str = String(str);

  while ((char = str[i]) && fn(char)) {
    i--;
  }

  return str.substr(0, i + 1);
};

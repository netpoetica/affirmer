# node-affirmer
# <img width="128" src="http://upload.wikimedia.org/wikipedia/commons/3/39/Joan_of_arc_miniature_graded.jpg" alt="Joan of Arc, interpretation, Wikipedia" style="display: block; margin: 0 auto !important;">

Assertion testing with node's core Assertions module with visual output. Have your code stand it's ground and get simple formatted output! Affirmer votre JavaScript avec Sainte Jeanne d'Arc!

## Usage
It works just like node's `assert`, except that the first argument is always the node `assert` method you want to call.
```
var Affirmer = require('../'),
    affirmer = new Affirmer({
      // Configurable options at instantiation
      colors: true,
      mute: false,
      theme: 'Joan'
    }),
    // Store a local reference to assert for ease of use
    // or to overwrite your asserts in your current app
    assert = affirmer.assert;

assert('notEqual', Math.PI, 3.14, 'JavaScript knows more decimals than that');
assert('fail', Math.PI, Math.PI, 'Math.PI should be equal to Math.PI', '>');
assert('equal', typeof "hello", 'string', '"hello" should definitely be a string. Definitely.');
```

### Why is there a picture of Joan of Arc?
Because she was awesome, and I used the colors of her Coat of Arms as the default theme for node-affirmer.

### Yeah, she was super duper, but I don't like that theme...
You can change the theme back to basic (red for fail, green for pass) when you instantiate `affirmer`:
```
var Affirmer = require('../'),
    affirmer = new Affirmer({
      theme: 'basic'
    });
```
You can also set at run-time like so:
```
affirmer.setTheme('basic');
```
or turn of colors altogether:
```
affirmer.toggleColors(false);
```

### Credits
ASCII art from http://www.retrojunkie.com/asciiart/weapons/shields.htm

### License
The MIT License (MIT)

Copyright (c) 2015 Keith Rosenberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

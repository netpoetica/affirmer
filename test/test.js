var circle = require('./fixtures/circle'),
    Square = require('./fixtures/square'),
    square = new Square(10, 10);

var Affirmer = require('../'),
    affirmer = new Affirmer({
      // colors: false
      // mute: true
      // theme: 'basic'
    }),
    assert = affirmer.assert;

// affirmer.mute();

assert('notEqual', Math.PI, circle.PI, 'circle.PI should be private and unusable in this context');
assert('fail', Math.PI, circle.PI, 'circle.PI should fail to be read because it is private and unusable in this context', '===');
assert('equal', typeof square.area, 'function', 'Squares should export an area method in their public API');
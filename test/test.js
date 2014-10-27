var circle = require('./fixtures/circle'),
    Square = require('./fixtures/square');

var Affirmer = require('../'),
    affirmer = new Affirmer({
      colors: false
      // mute: true
      // theme: 'basic'
    }),
    assert = affirmer.assert;

// affirmer.mute();
function CustomError(message){
  this.name = 'CustomError';
  this.message = message || "Custom Error Message";
}
CustomError.prototype = Error.prototype;

// Fail
assert('ok', square, 'square is instantiated');
assert('throws', function(){}, CustomError, 'should throw a CustomError');
assert('doesNotThrow', function(){ throw new CustomError(); }, 'should not throw any error');

var square = new Square(10, 10);

assert('ok', square, 'square is instantiated');
assert('fail', Math.PI, circle.PI, 'circle.PI should fail to be read because it is private and unusable in this context', '===');
assert('equal', typeof square.area, 'function', 'Squares should export an area method in their public API');
assert('notEqual', Math.PI, circle.PI, 'circle.PI should be private and unusable in this context');
assert('deepEqual', Math.PI, Math.PI, 'should be deeply equal');
assert('notDeepEqual', 3.1, 3.14, 'should not be deeply equal');
assert('strictEqual', Math.PI, Math.PI, 'should be strictly equal');
assert('notStrictEqual', "3.14", 3.14, 'should not be strictly equal');

assert('throws', function(){ throw new CustomError(); }, CustomError, 'should throw a CustomError');
assert('doesNotThrow', function(){}, 'should not throw any error');


// assert('ifError', function(){}, 'should not throw any error');
var _assert = require('assert'),
    fullWidth = require('node-fullwidth-stdout'),
    chalk = require('chalk');

/*
 * Wraps Node's assert module and makes it useful for outputting to stdout.
 * */
var themes = [
  {
    name: 'basic',
    background: 'bgBlack',
    log: 'green',
    error: 'red'
  },
  {
    name: 'Joan',
    background: 'bgYellow',
    log: 'white',
    error: 'blue'
  }
];

var silent = false,                                 // Use silent for app in production or outside of debug mode.
    lifeless = false,                               // Opinionated variable name for when people disable colored output.
    theme;                                          // Currently selected theme - Object

function setThemeByName(name){
  var result = themes.filter(function(item){
    return item.name === name;
  });

  if(!result.length){
    throw new Error("The them '" + name + "' does not exist.");
  } else {
    theme = result[0];
  }
}

function mute(bMute){
  silent = !!bMute || !silent;
}

function toggleColors(bColors){
  lifeless = !!bColors || !lifeless;
}

// Wrap log methods to be quiet in production.
function log(type, msg){
  if(!silent){
    if(type){
      msg = '\t' + msg;

      fullWidth
      .formatStr(msg)
      .forEach(function(line){
        console[type](lifeless ? line : chalk[theme[type]][theme.background](line));
      });
    } else {
      console.log(lifeless ? msg: chalk.gray(msg));
    }
  }
}

/*
 * fnName (String) - name of node's internal assert function you want to use
 * operator (String) - only used in assert.fail, shows actual + operator + expected in result.
 * */
function assert(fnName, actual /* or block */, expected /* or error, message */, msg, operator){
  var method = _assert[fnName],
      bErrorThrown = false,
      result;

  if(typeof method !== 'function'){
    throw new Error('Invalid method passed to assert: ' + fnName);
  } else {
    // ifError, throws, and doesNotThrow are special cases.
    switch(fnName){
      case 'ifError':
        break;
      case 'throws':
        // In the event of "throws", "expected" could either be a 
        // Constructor, RegExp, or validation function.
        // we expect an error in this case, so it's a pass.
        if(typeof expected === 'function' || expected instanceof "object"){
          try {
            // This *should not* throw in order to pass
            method(actual, expected, msg);
          } catch(e){
            bErrorThrown = true;
            result = msg;
          }
        } else {
          // in this case, make sure msg is properly
          // the actual message for logging purposes.
          msg = expected;

          try {
            method(actual, expected);
          } catch(e){
            bErrorThrown = true;
            result = msg;
          }
        }
        break;
      case 'doesNotThrow':
        // in this case, make sure msg is properly
        // the actual message for logging purposes.
        msg = expected;

        try {
          method(actual, expected);
        } catch(e){
          bErrorThrown = true;
          result = [expected, '\t(' + e.name +')', e.message || ''].join(' ');
        }
        break;
      default:
        try {
          method(actual, expected, msg, operator);
        } catch(e){
          bErrorThrown = true;

          if(operator){
            // var expected;

            // If expected is null or undefined, it will output empty to stdout, so
            // we must replace w/ a String. null and undefined to not have "toString()" methods.
            switch(e.expected){
              case null:
                expected = "null";
                break;
              case undefined:
                expected = "undefined";
                break;
              default:
                expected = e.expected;
                break;
            }

            result = [
              e.actual,
              e.operator,
              expected,
              '\t(' + e.name +')'
            ].join(' ');

          } else {
            result += e.message;
          }
        }
        break;
    }

    if(!bErrorThrown){
      log('log', '✓ (Pass):\t' + msg);
    } else {
      log('error', 'X (Fail):\t' + result);
    }

  }
}

// Convenience helpers...
function fail(actual, expected, message, operator){
  assert(['fail'].concat(arguments));
}
function equal(actual, expected, message){
  assert(['equal'].concat(arguments));
}
function ok(value, message){
  equal(value, true, message);
}
function notEqual(actual, expected, message){
  assert(['notEqual'].concat(arguments));
}
function deepEqual(actual, expected, message){
  assert(['deepEqual'].concat(arguments));
}
function notDeepEqual(actual, expected, message){
  assert(['notDeepEqual'].concat(arguments));
}
function strictEqual(actual, expected, message){
  assert(['strictEqual'].concat(arguments));
}
function notStrictEqual(actual, expected, message){
  assert(['notStrictEqual'].concat(arguments));
}
// don't use reserved keyword "throws"
function doesThrow(block, message){
  assert(['throws'].concat(arguments));
}
function doesNotThrow(block, message){
  assert(['doesNotThrow'].concat(arguments));
}
function ifError(value){
  assert(['ifError'].concat(arguments));
}

module.exports = function(opts){
  opts = opts || {};

  this.mute = mute;
  this.setTheme = setThemeByName;
  this.toggleColors = toggleColors;

  // lib's core asset method, wrapper of node's core assert
  this.assert = assert;

  // node's api for convenience
  this.ok = ok;
  this.fail = fail;
  this.equal = equal;
  this.notEqual = notEqual;
  this.deepEqual = deepEqual;
  this.notDeepEqual = notDeepEqual;
  this.strictEqual = strictEqual;
  this.notStrictEqual = notStrictEqual;
  this['throws'] = doesThrow;   // Do not use 'throw' reserved word
  this.doesNotThrow = doesNotThrow;
  this.ifError = ifError;

  if(typeof opts.mute === 'boolean'){
    mute(opts.mute);
  }

  if(typeof opts.theme === 'string'){
    setThemeByName(opts.theme);
  } else {
    // Set Default Theme.
    setThemeByName('Joan');     // Default theme is Joan.
  }

  if(typeof opts.colors === 'boolean'){
    toggleColors(opts.colors);
  }

  // Shield your code!
  log(null, [
    "\n\t\t\t",
    "node-affirmer\n\n",
    "|`-._/\\_.-`|",
    "|    ||    |",
    "|___o()o___|",
    "|__((<>))__|",
    "\\   o\\/o   /",
    " \\   ||   / ",
    "  \\  ||  /  ",
    "   '.||.'   ",
    "     ``  \n\n\n"
  ].join('\n\t\t\t\t'));

};

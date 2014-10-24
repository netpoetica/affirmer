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
    log: 'gray',
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
function assert(fnName, actual, expected, msg, operator){
  var method = _assert[fnName],
      bErrorThrown = false,
      result;

  if(typeof method !== 'function'){
    throw new Error('Invalid method passed to assert: ' + fnName);
  }

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

      result += [
        e.actual,
        e.operator,
        expected,
        '\t(' + e.name +')'
      ].join(' ');

    } else {
      result += e.message;
    }

    log('error', 'X (Fail):\t' + result);

  }

  if(!bErrorThrown){
    log('log', '✓ (Pass):\t' + msg);
  }
}


module.exports = function(opts){
  opts = opts || {};

  this.assert = assert;
  this.mute = mute;
  this.setTheme = setThemeByName;
  this.toggleColors = toggleColors;

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

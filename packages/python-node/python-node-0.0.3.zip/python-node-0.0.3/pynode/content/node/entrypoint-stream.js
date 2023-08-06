var path = require('path');
var readline = require('readline');
var invocationPrefix = 'invoke:';

function invocationCallback(errorValue, successValue) {
  if (errorValue) {
    throw new Error('InputOutputStreamHost doesn\'t support errors. Got error: ' + errorValue.toString());
  } else if (typeof successValue !== 'string') {
    var serializedResult = JSON.stringify(successValue);
    console.log(serializedResult);
  } else {
    console.log(successValue);
  }
}

readline.createInterface({input: process.stdin}).on('line', function (message) {
  if (message && message.substring(0, invocationPrefix.length) === invocationPrefix) {
    var invocation = JSON.parse(message.substring(invocationPrefix.length));
    var resolvedPath = path.resolve(process.cwd(), invocation.moduleName);
    var invokedModule = require(resolvedPath);
    var func = invocation.exportedFunctionName ? invokedModule[invocation.exportedFunctionName] : invokedModule;
    if (!func || !func.apply) {
      invocation.exportedFunctionName
        ? console.error('The module "' + resolvedPath + '" has no export named "' + invocation.exportedFunctionName + '"')
        : console.error('The module "' + resolvedPath + '" does not export a function by default');
    } else {
      func.apply(null, [invocationCallback].concat(invocation.args));
    }
  }
});

console.log('[pynode:Listening]');
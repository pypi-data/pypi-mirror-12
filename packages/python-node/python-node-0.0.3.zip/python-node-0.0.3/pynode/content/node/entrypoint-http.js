// Limit dependencies to core Node modules. This means the code in this file has to be very low-level and unattractive,
// but simplifies things for the consumer of this module.
var http = require('http');
var path = require('path');
var requestedPortOrZero = parseInt(process.argv[2]) || 0; // 0 means 'let the OS decide'

autoQuitOnFileChange(process.cwd(), ['.js', '.json', '.html']);

function readRequestBodyAsJson(request, callback) {
  var requestBodyAsString = '';
  request
    .on('data', function (chunk) {
      requestBodyAsString += chunk;
    })
    .on('end', function () {
      callback(JSON.parse(requestBodyAsString));
    });
}

function autoQuitOnFileChange(rootDir, extensions) {
  // Note: This will only work on Windows/OS X, because the 'recursive' option isn't supported on Linux.
  // Consider using a different watch mechanism (though ideally without forcing further NPM dependencies).
  var fs = require('fs');
  var path = require('path');
  fs.watch(rootDir, {persistent: false, recursive: true}, function (event, filename) {
    var ext = path.extname(filename);
    if (extensions.indexOf(ext) >= 0) {
      console.log('Restarting due to file change: ' + filename);
      process.exit(0);
    }
  });
}

var server = http.createServer(function (req, res) {
  readRequestBodyAsJson(req, function (bodyJson) {
    var resolvedPath = path.resolve(process.cwd(), bodyJson.moduleName);
    var invokedModule = require(resolvedPath);
    var func = bodyJson.exportedFunctionName ? invokedModule[bodyJson.exportedFunctionName] : invokedModule;
    if (!func || !func.apply) {
      bodyJson.exportedFunctionName
        ? console.error('The module "' + resolvedPath + '" has no export named "' + bodyJson.exportedFunctionName + '"')
        : console.error('The module "' + resolvedPath + '" does not export a function by default');
      res.statusCode = 404;
      res.end();
    } else {
      var hasSentResult = false;
      var callback = function (errorValue, successValue) {
        if (!hasSentResult) {
          hasSentResult = true;
          if (errorValue) {
            res.statusCode = 500;
            res.end();
          } else if (typeof successValue !== 'string') {
            // Arbitrary object/number/etc - JSON-serialize it
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(successValue));
          } else {
            // String - can bypass JSON-serialization altogether
            res.setHeader('Content-Type', 'text/plain');
            res.end(successValue);
          }
        }
      };

      func.apply(null, [callback].concat(bodyJson.args));
    }
  });
});

server.listen(requestedPortOrZero, 'localhost', function () {
  // Signal to HttpNodeHost which port it should make its HTTP connections on
  console.log('[pynode:Listening on port ' + server.address().port + '\]');

  // Signal to the NodeServices base class that we're ready to accept invocations
  console.log('[pynode:Listening]');
});
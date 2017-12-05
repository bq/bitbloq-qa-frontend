'use strict';

var fs = require('fs'),
  xml2js = require('xml2js'),
  moment = require('moment');

var dev = process.argv[2] === '--dev';
if (dev) {
  console.log('--[PARSER | DEV MODE]--');
}

// utils
var getErrorNumber = function(json) {
  var num = json.testsuites.testsuite[0].$.failures;
  return 'filter_' + (num < 10 ? num : num + '_plus');
};

var getRealDate = function(json) {
  return json.testsuites.testsuite[0].$.timestamp;
};

var getGlobalInfo = function(json) {
  var res = '#### Stats\n';
  Object.keys(json.testsuites.testsuite[0].$).forEach(function (k) {
    res += '- *' + k.toUpperCase() + ':* ';
    res += json.testsuites.testsuite[0].$[k] + '.\n';
  });
  return res + '\n\n';
};

var getErrors = function(json) {
  var res = '### ERRORS\n';
  var index = 0;
  Object.keys(json.testsuites.testsuite[0].testcase).forEach(function (k) {
    var errors = Object.keys(json.testsuites.testsuite[0].testcase[k]);
    if (errors.length > 1) {
      index++;
      var item = json.testsuites.testsuite[0].testcase[k];
      res += '\n';
      res += '##### #' + index + ':\n';
      Object.keys(item.$).forEach(function(i) {
        res += '- *' + i.toUpperCase() + ':* ';
        res += item.$[i] + '.\n';
      });
      if (item.failure) {
        Object.keys(item.failure).forEach(function(i) {
          res += ' - *' + 'type'.toUpperCase() + ':* ';
          res += item.failure[i].$.type + '.\n';
          res += ' - *' + 'message'.toUpperCase() + ':* ';
          res += item.failure[i].$.message + '.\n';
          // res += JSON.stringify(item.failure[i].$) + '.\n';
          res += ' - *' + 'content'.toUpperCase() + ':* ';
          res += item.failure[i]._ + '.\n';
          res += '\n\n';
        });
      }
      res += '\n';
    }
  });
  return res + '\n\n';
};

// xml2js
var parser = new xml2js.Parser();
var data = fs.readdirSync('./target/report/');
if (data) {
  dev && console.log('xml2json:');
  data.forEach(function(fileName) {
    var file = fs.readFileSync('./target/report/' + fileName);
    if (file) {
      parser.parseString(file, function(err, result) {
        if (!err && result) {
          var report = JSON.stringify(result);
          var reportPretty = JSON.stringify(result, null, 2);
          // folder
          var folderName = fileName.replace('.xml', '');
          var dir = fs.readdirSync(__dirname + '/src/items/');
          if (dir && dir.indexOf(folderName) === -1) {
            fs.mkdirSync(__dirname + '/src/items/' + folderName);
          }
          // md
          var mdDate = moment(getRealDate(result))
            .format('YYYY-MM-DD')
            .toString();
          var mdFileName = mdDate + '.' + folderName + '.md';
          var mdRoute =
            __dirname + '/src/items/' + folderName + '/' + mdFileName;
          dev && console.log(fileName + ' => ' + folderName + '/' + mdFileName);
          var output = '---\n';
          output += 'title: ' + getErrorNumber(result) + '\n';
          output += 'date: ' + mdDate + '\n';
          output += 'layout: post.jade\n';
          output += '---\n\n';
          output += getGlobalInfo(result);
          output += getErrors(result);
          output +=
            '<h4>JSON Output</h4>\n<pre><code class="language-json">\n' +
            reportPretty +
            '\n</code></pre>';
          fs.writeFileSync(mdRoute, output);
        } else {
          dev && console.log('[ERROR]: no se ha podido parsear ' + file);
        }
      });
    }
  });
} else {
  console.log('[ERROR]: No hay reportes en ./target/report');
}

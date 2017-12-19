'use strict';

var fs = require('fs'),
  xml2js = require('xml2js'),
  moment = require('moment'),
  mkdirp = require('mkdirp'),
  chalk = require('chalk');

var dev = process.argv[2] === '--dev';
if (dev) {
  console.log(chalk.cyan('--[PARSER | ') + chalk.yellow('DEV MODE') + chalk.cyan(']--'));
}

// if no src/items -> mkdir
mkdirp(__dirname + '/src/items', function(err) {
  if (err) { console.log(err); }
  else { console.log(chalk.cyan.bold('Preparando carpeta: ') + chalk.bgGreen.black.italic(__dirname + '/src/items')); }
});

// utils
var getErrorNumber = function(json) {
  var num = json.testsuites.testsuite[0].$.failures;
  return 'filter_' + (num < 10 ? num : 9 + '_plus');
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

var unHTML = function(str) {
  var res = str.replace(/(_)/g, '&#95;');
      res = res.replace(/(<)/g, '&#60;');
      res = res.replace(/(>)/g, '&#62;');
      res = res.replace(/(")/g, '&#34;');
  return res;
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
          res += '<div class="error-bloq">';
          res += '<p>*' + 'type'.toUpperCase() + ':* ';
          res += item.failure[i].$.type + '.</p>';
          res += '<p>*' + 'message'.toUpperCase() + ':* ';
          res += unHTML(item.failure[i].$.message) + '.</p>';
          res += '<p>*' + 'content'.toUpperCase() + ':*</p>';
          res += '<code class="content">' + unHTML(item.failure[i]._) + '</code>';
          res += '</div>';
        });
      }
      res += '\n';
    } else {
      res = '';
    }
  });
  return res + '\n\n';
};

var colecs = {};
var getColecs = function (date, title) {
  var res = [];
  // res.push(date); 
  res.push(title);

  //is into colecs => colec.js?
  res.forEach(function(i) {
    var bool = colecs[i];
    if (!bool) {
      colecs[i] = {
        sortBy: 'date',
        reverse: true
      };
    }
  });
  return res.join(' ');
};

// xml2js
var parser = new xml2js.Parser();
var data = fs.readdirSync('./target/report/');
if (data) {
  dev && console.log(chalk.yellow.italic('xml2json:'));
  data.forEach(function(fileName) {
    var file = fs.readFileSync('./target/report/' + fileName);
    if (file) {
      parser.parseString(file, function(err, result) {
        if (!err && result) {
          //var report = JSON.stringify(result);
          var reportPretty = JSON.stringify(result, null, 2);
          // folder
          var folderName = fileName.replace('.xml', '');
          var dir = fs.readdirSync(__dirname + '/src/items/');
          if (dir && dir.indexOf(folderName) === -1) {
            fs.mkdirSync(__dirname + '/src/items/' + folderName);
          }
          // md
          var theDate = moment(getRealDate(result))
          var fileDate = theDate.format('YYYY-MM-DD-kkmm').toString();
          var simpleDate = theDate;
          var mdFileName = fileDate + '.' + folderName + '.md';
          var mdRoute = __dirname + '/src/items/' + folderName + '/' + mdFileName;
          dev && console.log(chalk.yellow.italic(fileName + ' => ' + folderName + '/' + mdFileName));
          var output = '---\n';
          output += 'title: ' + getErrorNumber(result) + '\n';
          output += 'date: ' + simpleDate + '\n';
          output += 'layout: post.jade\n';
          output += 'collection: ' + getColecs(simpleDate, folderName) +'\n';
          output += '---\n\n';
          output += getGlobalInfo(result);
          output += getErrors(result);
          output +=
            '<h4>JSON Output</h4>\n<pre><code class="language-json">\n' +
            reportPretty +
            '\n</code></pre>';
          fs.writeFileSync(mdRoute, output);
        } else {
          dev && console.log(chalk.yellow.italic('[ERROR]: no se ha podido parsear ' + file));
        }
      });
    }
  });

  // colec => colec.js
  var resColec = JSON.stringify(colecs, null, 2);
  dev && console.log(chalk.yellow.italic(typeof colecs, resColec));
  fs.writeFileSync(__dirname + '/colec.js', 'module.exports = { colec: ' + resColec + ' };');
} else {
  console.log(chalk.red('[ERROR]: No hay reportes en ./target/report'));
}

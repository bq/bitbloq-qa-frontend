'use strict';

var fs = require('fs'),
  xml2js = require('xml2js'),
  moment =  require('moment');

var ms = require('metalsmith'),
  autocollections = require('metalsmith-auto-collections'),
  markdown = require('metalsmith-markdown'),
  layouts = require('metalsmith-layouts'),
  permalinks = require('metalsmith-permalinks'),
  pug = require('metalsmith-pug'),
  sass = require('metalsmith-sass'),
  serve = require('metalsmith-serve'),
  paths = require('metalsmith-paths'),
  watch = require('metalsmith-watch'),
  dateFormatter = require('metalsmith-date-formatter');

// xml2js
var parser = new xml2js.Parser();
fs.readdir('./target/report/', function(err, data) {
  if (!err && data) {
    data.forEach(function(fileName) {
      fs.readFile('./target/report/' + fileName, function(err, file) {
        parser.parseString(file, function(err, result) {
          if (!err && result) {
            var report = JSON.stringify(result);
            var reportPretty = JSON.stringify(result, null, 2);
            // folder
            var folderName = fileName.replace('.xml', '');
            fs.readdir(__dirname+'/src/items/', function(err, data) {
              // existe?
              if (!err && data && data.indexOf(folderName) === -1) {
                fs.mkdirSync(__dirname+'/src/items/'+folderName)
              }
            });
            // md
            var mdDate = moment().format('YYYY-MM-DD').toString()
            var mdFileName = mdDate+'.'+folderName+'.md';
            var mdRoute = __dirname+'/src/items/'+folderName+'/'+mdFileName;
            console.log(folderName+'/'+mdFileName);
            var output = '---\n';
            output += 'title: '+ folderName +'\n';
            output += 'date: '+ mdDate +'\n';
            output += 'layout: post.jade\n';
            output += '---\n\n';
            output += '<h4>JSON Original</h4>\n<pre><code class=\"language-json\">\n'+reportPretty+'\n</code></pre>';
            console.log(output,'->', mdRoute);
            fs.writeFile(mdRoute, output, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
          } else {
            console.log('[ERROR]: no se ha podido parsear '+file);
          }
        });
      });
    });
  } else {
    console.log('[ERROR]: No hay reportes en ./target/report');
  }
});

// metalsmith
ms(__dirname)
  .metadata({
    title: 'Bitbloq QA Reporter',
    description: 'Static Site generated to display QA reports'
  })
  .source('./src')
  .destination('./dist')
  .use(
    watch({
      paths: {
        '${source}/**/*': true
      },
      livereload: true
    })
  )
  .clean(true)
  .use(paths({ property: 'paths' }))
  .use(
    autocollections({
      pattern: 'items/**/*.md',
      settings: {
        sortBy: 'date',
        reverse: true
      }
    })
  )
  .use(markdown())
  .use(
    dateFormatter({
      dates: [
        {
          key: 'date',
          format: 'DD-MM-YYYY'
        }
      ]
    })
  )
  .use(
    permalinks({
      relative: false,
      pattern: ':collection/:url'
    })
  )
  .use(
    layouts({
      engine: 'pug',
      directory: './src/layouts'
    })
  )
  .use(
    sass({
      outputStyle: 'expanded',
      sourceMap: true,
      sourceMapContents: true
    })
  )
  .use(pug({ pretty: false }))
  .use(serve())
  .build(function(err, files) {
    if (err) {
      throw err;
    }
  });

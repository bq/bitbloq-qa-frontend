'use strict';

var fs = require('fs'),
  ms = require('metalsmith'),
  autocollections = require('metalsmith-auto-collections'),
  collections = require('metalsmith-collections'),
  markdown = require('metalsmith-markdown'),
  layouts = require('metalsmith-layouts'),
  permalinks = require('metalsmith-permalinks'),
  pug = require('metalsmith-pug'),
  sass = require('metalsmith-sass'),
  serve = require('metalsmith-serve'),
  paths = require('metalsmith-paths'),
  watch = require('metalsmith-watch'),
  dateFormatter = require('metalsmith-date-formatter'),
  beautify = require('metalsmith-beautify'),
  archive = require('metalsmith-archive'),
  tags = require('metalsmith-tags'),
  chalk = require('chalk');

var dev = process.argv[2] === '--dev';
if (dev) {
  console.log(chalk.cyan('\n--[METALSMITH | ') + chalk.yellow('DEV MODE') + chalk.cyan(']--'));
} else {
  console.log(chalk.cyan('\n--[METALSMITH | ') + chalk.green('NORMAL MODE') + chalk.cyan(']--'));
}

var colec = require('./colec.js')

// we are, we are, the metalheads!
var metal = ms(__dirname)
  .metadata({
    title: 'Bitbloq QA Reporter',
    description: 'Static Site generated to display QA reports'
  })
  .source('./src')
  .destination('./dist')
  .clean(true);

if (dev) {
  metal.use(
    watch({
      paths: {
        '${source}/**/*': true,
        '${source}/**/*.md': true
      },
      livereload: true
    })
  );
}

metal
  .use(paths({ property: 'paths' }))
  .use(
    collections(colec.colec)
  )
  .use(markdown())
  .use(
    dateFormatter({
      dates: [
        {
          key: 'date',
          format: 'YYYY-MM-DD_kk:mm'
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
  .use(pug({ pretty: true }))
  .use(
    beautify({
      js: false,
      html: { wrap_line_length: 80 }
    })
  )
  .use(
    tags({
      handle: 'tags'
    })
  );

metal.use(serve());
metal.build(function(err, files) {
  if (err) {
    throw err;
  } else {
    console.log(chalk.cyan('-> Build DONE:'), chalk.magenta(Object.keys(files).length), chalk.cyan('files procesed.'));
  }
});

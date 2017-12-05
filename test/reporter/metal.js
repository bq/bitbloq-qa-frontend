'use strict';

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
  dateFormatter = require('metalsmith-date-formatter'),
  beautify = require('metalsmith-beautify'),
  tags = require('metalsmith-tags');

var dev = process.argv[2] === '--dev';
if (dev) {
  console.log('--[METALSMITH | DEV MODE]--');
} else {
  console.log('--[METALSMITH | NORMAL MODE]--');
}

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
  .use(pug({ pretty: true }))
  .use(
    beautify({
      js: false,
      html: {
        wrap_line_length: 80
      }
    })
  )
  .use(
    tags({
      handle: 'tags'
    })
  );

if (dev) {
  metal.use(serve());
}

metal.build(function(err, files) {
  if (err) {
    throw err;
  } else {
    console.log('-> Build DONE:', Object.keys(files).length, 'files procesed.');
  }
});

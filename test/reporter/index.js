var Metalsmith      = require('metalsmith');
var collections     = require('metalsmith-collections');
var markdown        = require('metalsmith-markdown');
var layouts         = require('metalsmith-layouts');
var permalinks      = require('metalsmith-permalinks');
var pug             = require('metalsmith-pug');
var sass            = require('metalsmith-sass');
var models          = require('metalsmith-models');
var serve           = require('metalsmith-serve');

Metalsmith(__dirname)
  .metadata({
    title: 'Bitbloq QA Reporter',
    description: 'Static Site generated to display QA reports'
  })
  .source('./src')
  .destination('./dist')
  .clean(true)
  .use(collections({
      'reports': {
        sortBy : 'date',
        metadata: {
            name: 'Reports',
            description: 'by date'
        }
      }
    }))
  .use(markdown())
  .use(permalinks({ relative: false, 'pattern': ':date/:title' }))
  // .use(models({ directory: 'models' }))
  .use(layouts({
        engine    : 'pug',
        directory : './layouts'
      }))
  // .use(sass({ outputStyle: 'expanded' }))
  .use(pug({ pretty: false }))
  .use(serve())
  .build(function(err, files) {
    console.log('HEVEN OR HELL', files);
    if (err) { throw err; }
  });

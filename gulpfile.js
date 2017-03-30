/*!
 * gulp
 * $ npm install gulp gulp-jshint gulp-supervisor opn --save-dev
 */
var gulp        = require('gulp'),
    supervisor  = require('gulp-supervisor'),
    opn         = require('opn');

var conf = require('./conf');

var sourcePaths = {
  app: ['index.js']
};

gulp.task( 'supervise', function() {
    supervisor( 'index.js', {
        args: [],
        watch: sourcePaths.app,
        pollInterval: 500,
        extensions: [ 'js' ],
        exec: 'node',
        debug: true,
        debugBrk: false,
        harmony: true,
        noRestartOn: false,
        forceWatch: true,
        quiet: false
    } );
} );


gulp.task('openbrowser', function() {
  // supervise takes a second to start it up
  setTimeout(function(){
    opn( 'http://a.com:'+conf.port );
    opn( 'http://b.com:'+conf.port );
  }, 500);
});

gulp.task('default', ['supervise', 'openbrowser']);

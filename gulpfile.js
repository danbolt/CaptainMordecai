/* Hello, entusiastic code-reader! The following gulpfile compiles coffeescript,
 * and places it in the build folder, along with minified game assets.
 * Feel free to shoot Daniel a question if you're curious about what is
 * here.
 */

/* Gulp and processing plugins. */
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

/* Source and build destination directories for files. */
var coffeeSrc = './src/script/*.coffee';
var coffeeDst = './build/script';
var libSrc = './src/lib/*.js'
var libDst = './build/lib'
var imgSrc = './src/img/*';
var imgDst = './build/img';
var htmlSrc = './src/*.html';
var htmlDst = './build/';
var styleSrc = './src/scss/*.scss';
var styleDst = './build/css';

// Build our CoffeeScript files
gulp.task('coffee', function()
{
  gulp.src(coffeeSrc)
    .pipe(coffee( { bare: true} ).on('error', gutil.log))
    .pipe(gulp.dest(coffeeDst));
});

// Copy JavaScript libraries
gulp.task('lib', function()
{
  gulp.src(libSrc)
  .pipe(gulp.dest(libDst));
});

// Copy image files
gulp.task('img', function()
{
  gulp.src(imgSrc)
  .pipe(gulp.dest(imgDst));
});

// Copy html files
gulp.task('html', function()
{
  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

// Build stylesheet files
gulp.task('style', function()
{
  gulp.src(styleSrc)
  .pipe(sass())
  .pipe(gulp.dest(styleDst));
});

// Default task (this is run when you type 'gulp' in the root directory)
gulp.task('default', ['coffee', 'lib', 'img', 'html', 'style'], function()
{
  // watch for changes in CoffeeScript files
  gulp.watch(coffeeSrc, ['coffee']);

  // watch for changes in image files
  gulp.watch(imgSrc, ['img']);

  // watch for changes in html files
  gulp.watch(htmlSrc, ['html']);

  // watch for changes in stylesheets
  gulp.watch(styleSrc, ['style']);
});

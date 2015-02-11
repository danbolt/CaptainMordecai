/* Gulp and processing plugins */
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

gulp.task('coffee', function() {
  gulp.src('./src/script/*.coffee')
    .pipe(coffee( { bare: true} ).on('error', gutil.log))
    .pipe(gulp.dest('./build/script'));
});

gulp.task('img', function() {
  var imgSrc = './src/img/*';
  var imgDst = './build/img';

  gulp.src(imgSrc)
  .pipe(gulp.dest(imgDst));
});

gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html';
  var htmlDst = './build/';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('default', ['coffee', 'img', 'htmlpage'], function() {});

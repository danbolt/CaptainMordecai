### Hello, entusiastic code-reader! The following gulpfile compiles coffeescript,
# and places it in the build folder, along with minified game assets.
# Feel free to shoot Daniel a question if you're curious about what's going on.
###

### Gulp and processing plugins. ###
gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')
concat = require('gulp-concat')
sass = require('gulp-sass')
changed = require('gulp-changed')
imagemin = require('gulp-imagemin')
minifyHTML = require('gulp-minify-html')

### Source and build destination directories for files. ###
coffeeSrc = ['./src/script/*State.coffee', './src/script/main.coffee', './src/script/*.coffee']
coffeeDst = './build/script'
libSrc = './src/lib/*.js'
libDst = './build/lib'
imgSrc = './src/img/*'
imgDst = './build/img'
htmlSrc = './src/*.html'
htmlDst = './build/'
styleSrc = './src/scss/*.scss'
styleDst = './build/css'

# Build our CoffeeScript files
gulp.task 'coffee', ->
  gulp.src(coffeeSrc).pipe(concat('main.coffee')).pipe(coffee(bare: true).on('error', gutil.log)).pipe gulp.dest(coffeeDst)
  return

# Copy JavaScript libraries
gulp.task 'lib', ->
  gulp.src(libSrc).pipe gulp.dest(libDst)
  return

# Copy image files
gulp.task 'img', ->
  gulp.src(imgSrc).pipe gulp.dest(imgDst)
  return

# Copy html files
gulp.task 'html', ->
  gulp.src(htmlSrc).pipe(minifyHTML()).pipe gulp.dest(htmlDst)
  gulp.src('./src/favicon/*').pipe gulp.dest('./build')
  return

# Build stylesheet files
gulp.task 'style', ->
  gulp.src(styleSrc).pipe(sass()).pipe gulp.dest(styleDst)
  return

# Default task (this is run when you type 'gulp' in the root directory)
gulp.task 'default', [
  'coffee'
  'lib'
  'img'
  'html'
  'style'
], ->
  # watch for changes in CoffeeScript files
  gulp.watch coffeeSrc, [ 'coffee' ]
  # watch for changes in image files
  gulp.watch imgSrc, [ 'img' ]
  # watch for changes in html files
  gulp.watch htmlSrc, [ 'html' ]
  # watch for changes in stylesheets
  gulp.watch styleSrc, [ 'style' ]
  return

# ---
# generated by js2coffee 2.0.1

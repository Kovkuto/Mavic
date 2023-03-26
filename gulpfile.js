const { dest, src, watch, parallel, series } = require('gulp')
const browserSync = require('browser-sync').create()
const scss = require('gulp-sass')(require('node-sass'))
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify-es').default
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
}

function styles() {
  return src([
    'node_modules/fullpage.js/dist/fullpage.css',
    'app/scss/**/*.scss',
    'app/css/**/*.css',
    '!app/css/style.min.css'
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/fullpage.js/dist/fullpage.js',
    'node_modules/fullpage.js/dist/fullpage.extensions.min.js',
    'app/js/**/*.js',
    '!app/js/main.min.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function watching() {
  watch([
    'app/scss/**/*.scss',
    'app/css/**/*.css',
    '!app/css/style.min.css'
  ], styles)
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

async function cleanDist() {
  return del('dist')
}

function collectFiles() {
  return src([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/fonts/**/*',
    'app/*.html',
  ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.watching = watching
exports.browsersync = browsersync
exports.cleanDist = cleanDist
exports.build = series(cleanDist, images, collectFiles)
exports.default = parallel(watching, browsersync, scripts)
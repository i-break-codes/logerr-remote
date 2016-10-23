var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    renameFiles  = require('gulp-rename'),
    config       = require('./app/engine/config/GULPConfig.js');
    
  gulp.task('browser-sync', function() {
    browserSync.init(null, {
      baseDir: config.bSync.baseDir,
      proxy: config.bSync.proxy,
      port: config.bSync.port
    });
  });
  
  gulp.task('bs-reload', function () {
    browserSync.reload();
  });
    
  gulp.task('css', function () {
    return gulp.src(config.css.basePath)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(autoprefixer.condition))
      .pipe(gulp.dest(config.css.outputPath))
      .pipe(cleanCSS({debug: true}, function(details) {
        console.log('Original Size : ' + details.name + ': ' + details.stats.originalSize + ' bytes');
        console.log('Minified Size : ' + details.name + ': ' + details.stats.minifiedSize + ' bytes');
      }))
      .pipe(renameFiles({ 
        suffix: config.js.fileSuffix 
      }))
      .pipe(gulp.dest(config.css.outputPath))
      .pipe(browserSync.reload({
        stream: true
      }));
  });
  
  
  gulp.task('js',function(){
    return gulp.src(config.js.basePath)
      .pipe(gulp.dest(config.js.outputPath))
      .pipe(uglify())
      .pipe(renameFiles({ 
        suffix: config.js.fileSuffix 
      }))
      .pipe(gulp.dest(config.js.outputPath))
      .pipe(browserSync.reload({
        stream: true
      }));
  });
  
  gulp.task('default', ['js', 'css', 'browser-sync'], function () {
    gulp.watch(config.css.basePath, ['css']);
    gulp.watch(config.js.basePath, ['js']);
    gulp.watch(config.views.basePath, ['bs-reload']);
  });
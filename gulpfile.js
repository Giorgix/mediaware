var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
  return sass('./public/css/style.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/style.scss', ['sass']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js handlebars coffee',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);

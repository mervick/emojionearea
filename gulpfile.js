var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minify', function() {
  return gulp.src('js/emojionearea.js')
              .pipe(uglify())
              .pipe(rename('emojionearea.min.js'))
              .pipe(gulp.dest('js/'));
})
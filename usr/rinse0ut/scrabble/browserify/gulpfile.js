var gulp      = require('gulp');
var webserver = require('gulp-webserver');
var watch     = require('gulp-watch');
var exec      = require('child_process').exec;

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      port: '9090',
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function() {
    gulp.watch('app/*.js', ['build']);
});

gulp.task('build', function(cb) {
    exec('npm run build', function (err, stdout, stderr) {
    console.log('Building scrabble app...');
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

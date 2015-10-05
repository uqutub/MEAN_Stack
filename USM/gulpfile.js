var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

gulp.task('cleanBuiltDir', function(){
	return gulp.src('build/**/*.js').pipe(rimraf());
});

gulp.task('buildServer', ['cleanBuiltDir'], function () {
	var tsResult = gulp.src(['src/**/*.ts'])
		.pipe(ts({
				module: 'CommonJS'
		}));
	return tsResult.js.pipe(gulp.dest('build'));
});

// gulp.task('angular2', function() {
// 	var tsResult = gulp.src('angular/**/*.ts')
// 					.pipe(ts({
// 						module: 'CommonJS'
// 					}));
// 	return tsResult.js.pipe(concat('appJS.js')).pipe(gulp.dest('public/js'));
// });

gulp.task('angular', ['buildServer'], function () {
	return gulp.src('build/angular/**/*.js').pipe(concat('appjs.js')).pipe(gulp.dest('public/js'));
});

gulp.task('nodemon', ['angular', 'watch'], function(){
nodemon({
script: './build/server.js'
}).on('restart', function(){
console.log('GULP: nodemon restarted server.js');
})
});

gulp.task('watch', function() {
gulp.watch('src/**/*.ts', ['buildServer']);
// gulp.watch('angular/**/*.ts', ['angular']);
});

gulp.task('default', ['nodemon']);
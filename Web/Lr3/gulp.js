const gulp = require("gulp");
const less = require('gulp-less');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require("del");
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const run = require('gulp-run');

gulp.task('clean', () => del(["public/assets"]));

gulp.task('styles', () => {
    return gulp.src('public/css/style.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/assets/css'));
});

// gulp.task('serve', ['clean', 'styles'], () => {
//    return gulp.src('.')
//        .pipe(run('node babel.js'));
// });

gulp.task("default", ['clean', 'styles']);

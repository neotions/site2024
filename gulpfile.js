const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');

// Compile SCSS to CSS
function styles() {
    return gulp.src('dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/styles'));
}

// Concatenate and minify JS
function scripts() {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/scripts'));
}

// Include Header and Footer
function includeHtml() {
    return gulp.src('dev/html/pages/**/*.html') // Only process HTML files in /dev/pages
        .pipe(fileInclude({
            prefix: '@@',
            basepath: 'dev/html/includes/' // Corrected base path for includes
        }))
        .pipe(gulp.dest('public')); // Output the processed HTML files to /public
}

// Watch files for changes
function watchFiles() {
    gulp.watch('dev/scss/**/*.scss', styles);
    gulp.watch('dev/scripts/**/*.js', scripts);
    gulp.watch('dev/html/pages/**/*.html', includeHtml);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(styles, scripts), includeHtml);
const watch = gulp.parallel(watchFiles);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.includeHtml = includeHtml;
exports.build = build;
exports.watch = watch;
exports.default = build;
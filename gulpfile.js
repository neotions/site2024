/* IMPORTS */
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');

/* TASKS */

// Compile SCSS to CSS, concatenate into one file, minify it, and generate source maps
function styles() {
    return gulp.src('dev/scss/**/*.scss')
        .pipe(sourcemaps.init()) // Initialize sourcemaps before compilation starts
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css')) // Concatenate all CSS files into one
        .pipe(cssnano()) // Minify the concatenated CSS file
        .pipe(rename({ suffix: '.min' })) // Rename the minified file
        .pipe(sourcemaps.write('.')) // Write sourcemaps file in the current directory
        .pipe(gulp.dest('public/styles')); // Output the final CSS file to 'public/styles'
}

// Concatenate and minify JS
function scripts() {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(concat('scripts.js'))
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

/* BUILD */

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

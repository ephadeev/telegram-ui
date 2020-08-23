'use strict';

const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('docs/'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('docs/css/'))
}

function clear() {
    return del(['./docs/'])
}

function serve() {
    sync.init({
        server: './docs/'
    });

    watch('src/**.html', series(html)).on('change', sync.reload);
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
}

function icons() {
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(dest('./docs/webfonts/'));
}

exports.build = series(clear, scss, html);
exports.serve = series(clear, icons, scss, html, serve);
exports.clear = clear;
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('cache'),
    imgCompress = require('imagemin-jpeg-recompress'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';



gulp.task('sass', async function () {
    return gulp.src(['app/scss/**/*.scss', 'app/scss/**/*.sass', 'app/libs/**/*.scss'])
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions'], {cascade: true}))
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-min', async function () {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css:build', async function () {
    return gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('script-libs:build', async  function () {
    return gulp.src('app/libs/*.js')
        .pipe(rigger())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('code', async function () {
    return gulp.src('app/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', async function () {
    return gulp.src('app/js/*.js')
        .pipe(rigger())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', async function () {

    gulp.watch(['app/scss/**/*.scss', 'app/scss/**/*.sass'], gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/*.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
    // gulp.watch('app/css/*.css', gulp.parallel(['css-min']));
    gulp.watch('app/css/*.css', gulp.parallel('css:build'));
    gulp.watch('app/libs/*.js', gulp.parallel('script-libs:build'));
});

gulp.task('browser-sync', async function () {

    browserSync({
        server: {
            baseDir: 'dist',
            index: 'index.html'
        },
        notify: false
    });
});

gulp.task('clear', async function () {
    return del.sync('dist');
});


gulp.task('img', async function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin([
                imgCompress({
                    loops: 4,
                    min: 70,
                    max: 80,
                    quality: 'high'
                }),
                imagemin.gifsicle(),
                imagemin.optipng(),
                imagemin.svgo()
            ]
        ))
        .pipe(gulp.dest('dist/img'));
});


// gulp.task('prebuild', async function () {
//
//     var buildCss = gulp.src('app/css/*.min.css')
//         .pipe(gulp.dest('dist/css'))
//
//     var buildJs = gulp.src('app/js/**/*')
//         .pipe(gulp.dest('dist/js'))
//
//     var buildHtml = gulp.src('app/*.html')
//         .pipe(gulp.dest('dist'));
//
//     var buildFonts = gulp.src('app/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'));
//
//
// });

gulp.task('default', gulp.parallel('clear', 'sass', 'css:build', 'code', 'scripts', 'script-libs:build', 'img', 'browser-sync', 'watch'));

// gulp.task('build', gulp.parallel('clear', 'prebuild', 'img', 'sass', 'scripts'));

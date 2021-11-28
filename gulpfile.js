const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
// const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const buildDir = 'build';
const watchDir = 'output';

const config = {
	view: {
		renderFiles: ['src/views/files/*.pug', 'src/views/!blocks/**', 'src/views/!layout/**'],
		subscribeFiles: 'src/views/**/*.pug',
		dest: watchDir,
    build: buildDir,
	},
	scripts: {
    renderFiles: ['src/scripts/*.js'],
		subscribeFiles: 'src/scripts/**/*.js',
		dest: watchDir + '/scripts',
    build: buildDir + '/scripts',
	},
	styles: {
    renderFiles: ['src/styles/files/**/*.scss', 'src/styles/!components/**'],
		subscribeFiles: 'src/styles/**/*.scss',
		dest: watchDir + '/styles',
    build: buildDir + '/styles',
	},
	// images: {
	// 	renderFiles: 'src/images/*.+(png|jpeg|jpg|gif|svg)',
	// 	dest: watchDir + '/images'
	// },
	// fonts: {
	// 	renderFiles: 'src/fonts/*',
	// 	dest: watchDir + '/fonts'
	// },
	browserSync: {
		baseDir: watchDir,
	},
  buildDir: buildDir,
};

function clean(cb) {
  // body omitted
  cb();
}

// View
function viewTranspile() {
  return gulp.src(config.view.renderFiles, { sourcemaps: true })
    .pipe(pug({}))
    .pipe(gulp.dest(config.view.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
};

function viewBundle() {
  return gulp.src(config.view.renderFiles)
    .pipe(pug({}))
    .pipe(gulp.dest(config.view.build));
}

// Styles
function cssTranspile() {
  return gulp.src(config.styles.renderFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream());
}

function cssBundle() {
  return gulp.src(config.styles.renderFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.styles.build));
}

// Scripts
function jsTranspile() {
  return gulp.src(config.scripts.renderFiles)
    .pipe(babel())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream());
}

function jsBundle() {
  return gulp.src(config.scripts.renderFiles)
    .pipe(babel())
    .pipe(gulp.dest(config.scripts.build));
}

function jsMinify() {
  return gulp.src(config.scripts.renderFiles)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.scripts.build));
}

function browserSyncTask(done) {
  browserSync.init({
    ui: {
      port: 8080,
      weinre: {
        port: 9090
      }
    },
    server: {
      baseDir: config.browserSync.baseDir,
    }
  });
  done();
}

// subscribe all file
function watchTask() {
  gulp.watch(config.view.subscribeFiles, viewTranspile);
  gulp.watch(config.styles.subscribeFiles, cssTranspile);
  gulp.watch(config.scripts.subscribeFiles, jsTranspile);
}

exports.default = gulp.series(
  clean,
  gulp.parallel(viewTranspile, cssTranspile, jsTranspile),
  gulp.parallel(watchTask, browserSyncTask),
);

exports.watch = gulp.series(
  clean,
  gulp.parallel(viewTranspile, cssTranspile, jsTranspile),
  gulp.parallel(watchTask, browserSyncTask),
);

exports.build = gulp.series(
  clean,
  gulp.parallel(viewBundle, cssBundle, jsBundle),
  gulp.parallel(jsMinify),
);

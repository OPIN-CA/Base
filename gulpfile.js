// Set domain to your local development domain or 'auto' to use BrowserSync.
// Set domain to null to disable BrowserSync.
var domain = 'auto'; 

var sassLintConfigFile = 'sass-lint.yml';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var log = require('fancy-log');
var colors = require('ansi-colors');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
var fs = require('file-system');

// Function to check for the existence of the Sass-lint config file.
function sassLintCheck() {
  try {
    fs.accessSync(sassLintConfigFile);
    runSassLint = true;
    log.info('Using sass-lint config file: ' + colors.magenta(sassLintConfigFile));
  } catch (err) {
    log.warn(colors.yellow.bold(`Warning: Sass-lint config file ${sassLintConfigFile} was not found. Sass-lint is disabled.`));
    return false;
  }
  return true;
};

gulp.task('serve', function() {
  if (domain == 'auto') {
    // Attempt to automatically get the domain name from Dev Desktop's config files.
    domain = require('gulp-getdevdesktopdomain');
    if (domain == null) {
      log.warn(colors.yellow.bold('Warning: Could not set BrowserSync domain name automatically.'));
      log.warn(colors.yellow.bold('  Manually set a domain name in gulpfile.js to use BrowserSync.'));
    } else {
      log.info('Found Dev Desktop domain: ' + colors.magenta(domain));
    }
  }

  // Skip BrowserSync init if no domain is provided.
  if (domain) {
    browserSync.init({
      proxy: domain,
      scrollRestoreTechnique: 'window.name'
      // browser:     "google chrome"
    });
  }

  gulp.watch("sass/**/*.scss").on('change', gulp.series(['sass']));
  gulp.watch(["templates/**/*.twig", "includes/**/*.inc"]).on('change', gulp.series(['clearDrupalCache', 'browserSyncReload']));
  gulp.watch('js/*.js').on('change', gulp.series(['browserSyncReload']));
});

gulp.task('browserSyncReload', function() {
  return browserSync.reload();
});

gulp.task('sass-lint', function(done, err) {
  if (sassLintCheck()) {
    stream = gulp.src("sass/**/*.scss")
      .pipe(plumber(function(error) {
        log.error(colors.red.bold('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
      }))
      .pipe(plumber({errorHandler: notify.onError("Error : <%= error.message %>")}))
      .pipe(sassLint({
        configFile: sassLintConfigFile
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());

    return stream;
  } else {
    return done(err);
  }
});

gulp.task('sass-lint-ci', function(cb) {
  if (sassLintCheck()) {
    exec("./node_modules/sass-lint/bin/sass-lint.js -v --max-warnings 0 -c " + sassLintConfigFile + " 'sass/**/*.scss'", function(err, stdout) {
      log(stdout);
      cb(err);
    });
  } else {
    cb('No sass-lint config file');
  }
});

gulp.task('sass', function() {
  stream = gulp.src("sass/**/*.scss")
    .pipe(plumber(function(error) {
      log.error(colors.red.bold('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(plumber({errorHandler: notify.onError("Error : <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer([
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 28',
      'safari >= 5',
      'opera >= 23',
      'ios >= 6',
      'android >= 4.2',
    ], {
      grid: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));

  // Only add BrowserSync to the stream if a domain name is provided.
  if (domain) {
    stream = stream.pipe(
      browserSync.stream({
        stream: true
      })
    );
  }

  return stream;
});

gulp.task('clearDrupalCache', function(done) {
  drushCmd = 'drush cc render';

  if (drushCmd) {
    exec(drushCmd, function (err, stdout, stderr) {
      log(stdout);
      log(stderr);
      done();
    });
  }
});

gulp.task('default', gulp.series(['sass-lint', 'sass', 'serve']));
gulp.task('sass-lint-ci', gulp.series(['sass-lint-ci']));

var GULPConfig = Object.freeze({
  bSync: {
    baseDir: 'app',
    proxy: 'http://localhost:8080',
    port: 8080
  },
  css: {
    basePath: 'src/stylesheets/**/*.scss',
    outputPath: 'app/assets/stylesheets',
    fileSuffix: 'min'
  },
  js: {
    basePath: 'src/scripts/**/*.scss',
    outputPath: 'app/assets/scripts',
    fileSuffix: 'min'
  },
  views: {
    basePath: 'app/*.ejs'
  },
  autoprefixer: {
    condition: 'last 3 version'
  }
});

module.exports = GULPConfig;
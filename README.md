
## Quick Start
```
  npm i
  npm run start
  npm run build
```

## Config
```
  // default config
  const config = {
    view: {
      renderFiles: ['src/views/files/*.pug',],
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
      renderFiles: ['src/styles/files/**/*.scss'],
      subscribeFiles: 'src/styles/**/*.scss',
      dest: watchDir + '/styles',
      build: buildDir + '/styles',
	},
```

```
  renderFiles: we will render all file in this folder
  subscribeFiles: subscribe all files in this folder and watch it
  dest: support run repo on local
  build: bundle folder for deploy
```

## Documents
https://gulpjs.com/docs/en/getting-started/quick-start
https://pugjs.org/api/getting-started.html
https://browsersync.io/docs/gulp
https://sass-lang.com/guide
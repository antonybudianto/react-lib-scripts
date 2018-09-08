react-lib-scripts
=================

All-in-one CLI for building React Library

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/react-lib-scripts.svg)](https://npmjs.org/package/react-lib-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/react-lib-scripts.svg)](https://npmjs.org/package/react-lib-scripts)
[![License](https://img.shields.io/npm/l/react-lib-scripts.svg)](https://github.com/antonybudianto/react-lib-scripts/blob/master/package.json)

You can check [react-lib-starter](https://github.com/antonybudianto/react-lib-starter) for the usage.

<!-- toc -->
* [Stacks](#stacks)
* [Usage](#usage)
* [Commands](#commands)
* [Customize](#customize)
* [Blog](#blog)
<!-- tocstop -->
# Stacks
Tech stacks used:
- CLI
  - OCLIF
- Bundler
  - Webpack 4
    - css-loader, iso-morphic-style-loader
    - postcss-loader (autoprefixer)
    - url-loader (all images will be base64)
    - webpack-node-externals
  - Babel

# Usage
```sh-session
$ npm install -D react-lib-scripts
```

```
You can put the command as npm scripts.
"start": "react-lib-scripts start",
"build": "react-lib-scripts build"

Note:
- Node 8+ supported
- `NODE_ENV` environment variable is required.
```

```
Set following fields on your package.json
"main": "lib/index.js",
"files": [
  "lib",
  ...
],
```

# Commands
<!-- commands -->
* [`react-lib-scripts build`](#react-lib-scripts-build)
* [`react-lib-scripts help [COMMAND]`](#react-lib-scripts-help-command)
* [`react-lib-scripts start`](#react-lib-scripts-start)

## `react-lib-scripts build`

Create library bundle

```
USAGE
  $ react-lib-scripts build

DESCRIPTION
  ...
  Create library bundle
```

_See code: [src/commands/build.js](https://github.com/antonybudianto/react-lib-scripts/blob/v0.0.17/src/commands/build.js)_

## `react-lib-scripts help [COMMAND]`

display help for react-lib-scripts

```
USAGE
  $ react-lib-scripts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_

## `react-lib-scripts start`

Start lib development flow

```
USAGE
  $ react-lib-scripts start

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/start.js](https://github.com/antonybudianto/react-lib-scripts/blob/v0.0.17/src/commands/start.js)_
<!-- commandsstop -->
# Customize
- Babel
  - You can put `.babelrc` in the root of your package
- Webpack
  - Create `rls.config.js`
  - Copy and paste following:
    ```js
    module.exports = {
      modifyWebpack: (config) => config
    }
    ```
- PostCSS
  - You can put `postcss.config.js` in the root of your package
  
# Blog
https://itnext.io/building-react-library-using-react-lib-scripts-eab6f0fd21f2

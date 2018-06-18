const path = require('path')
const nodeExternals = require('webpack-node-externals')
const fs = require('fs')

const devMode = process.env.NODE_ENV === 'development'
const cwd = process.cwd()

const pcwd = path.resolve(cwd)

function resolveCwd(name) {
  return path.resolve(cwd, name)
}

function resolveDir(name) {
  return path.resolve(__dirname, name)
}

function loadConfigOnBase(fileName) {
  const configOnBase = resolveCwd(fileName)
  const defaultConfig = resolveDir('.babelrc')

  if (fs.existsSync(configOnBase)) {
    console.log(`> "${fileName}" exists. react-lib-scripts will use this one.`)
    return configOnBase
  }
  console.log(
    `> "${fileName}" doesn't exist. react-lib-scripts will use default config.`
  )
  return defaultConfig
}

let rlsConfig = {}
const rls = resolveCwd('rls.config.js')
let babelRcPath = loadConfigOnBase('.babelrc')
let postcssPath = loadConfigOnBase('postcss.config.js')

if (fs.existsSync(rls)) {
  console.log('> rls.config.js exists. Configuration applied.')
  rlsConfig = require(rls)
}

const config = {
  context: pcwd,
  devtool: devMode ? 'inline-source-map' : undefined,
  mode: devMode ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(pcwd, './lib'),
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          extends: babelRcPath,
        },
      },
      {
        test: /\.css$/,
        use: [
          'iso-morphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: postcssPath,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [],
}

let finalConfig = config

if (rlsConfig.modifyWebpack) {
  const webpackConfig = rlsConfig.modifyWebpack(config)
  if (!webpackConfig) {
    console.warn('> modifyWebpack should return config.')
  } else {
    console.log('> Webpack modify is applied.')
    finalConfig = webpackConfig
  }
}

module.exports = finalConfig

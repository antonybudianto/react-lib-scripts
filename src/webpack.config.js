const path = require('path')
const nodeExternals = require('webpack-node-externals')
const fs = require('fs')

const devMode = process.env.NODE_ENV === 'development'
const cwd = process.cwd()

const pcwd = path.resolve(cwd)

const babelRcOnBase = path.resolve(cwd, '.babelrc')
let babelRcPath = path.resolve(__dirname, '.babelrc')
const rls = path.resolve(cwd, 'rls.config.js')

if (fs.existsSync(babelRcOnBase)) {
  console.log('> .babelrc exists. react-lib-scripts will use this one.')
  babelRcPath = babelRcOnBase
} else {
  console.log(
    '> .babelrc does not exists. react-lib-scripts will use default config.'
  )
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
              minimize: true,
              url: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
}

let finalConfig = config

if (fs.existsSync(rls)) {
  console.log('> rls.config.js exists. Configuration applied.')
  const rlsConfig = require(rls)

  if (rlsConfig.modifyWebpack) {
    const webpackConfig = rlsConfig.modifyWebpack(config)
    if (!webpackConfig) {
      console.warn('> modifyWebpack should return config.')
    } else {
      console.log('> Webpack modify is applied.')
      finalConfig = webpackConfig
    }
  }
}

module.exports = finalConfig

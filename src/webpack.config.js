// const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const devMode = process.env.NODE_ENV === 'development'
const cwd = process.cwd()

const pcwd = path.resolve(cwd)
const dcwd = path.resolve(__dirname)
console.log('wp app cwd: ', pcwd)
console.log('wp app __dir: ', dcwd)

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
          extends: path.resolve(__dirname, '.babelrc'),
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

module.exports = config

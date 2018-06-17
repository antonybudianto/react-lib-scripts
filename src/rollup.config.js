const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const external = require('rollup-plugin-peer-deps-external')
const postcss = require('rollup-plugin-postcss')
const resolve = require('rollup-plugin-node-resolve')
const url = require('rollup-plugin-url')

// import pkg from '../package.json'

const path = require('path')

const cwd = process.cwd()
const pcwd = path.resolve(cwd)
const appBase = path.resolve(pcwd) + '/'
console.log('appBase', appBase)
const pkg = require(appBase + 'package.json')

module.exports = {
  input: appBase + 'src/index.js',
  output: [
    {
      file: appBase + pkg.main,
      format: 'cjs',
    },
    {
      file: appBase + pkg.module,
      format: 'es',
    },
  ],
  watch: {
    chokidar: {
      paths: 'src/**',
    },
  },
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
}

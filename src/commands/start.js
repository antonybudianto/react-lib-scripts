const { Command } = require('@oclif/command')
// const webpack = require('webpack')

// const config = require('../webpack.config')

const rollup = require('rollup')

const options = require('../rollup.config')
const watchOptions = { input: options.input }
const watcher = rollup.watch(options)
console.log(options)

class StartCommand extends Command {
  async run() {
    this.log('hahahac')
    watcher.on('event', event => {
      console.log('CODE:', event.code)
    })
  }
}

StartCommand.description = `Start lib development flow
...
Extra documentation goes here
`

module.exports = StartCommand

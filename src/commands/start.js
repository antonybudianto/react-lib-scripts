const { Command } = require('@oclif/command')
const { spawn } = require('child_process')
const webpack = require('webpack')
const path = require('path')

const cwd = process.cwd()
const config = require('../webpack.config')

console.log('path cwd', path.resolve(cwd))
console.log('path dirname', path.resolve(__dirname))

class StartCommand extends Command {
  async run() {
    const ins = webpack(config)
    ins.watch(
      {
        aggregateTimeout: 300,
        poll: undefined,
      },
      (err, stats) => {
        if (err) {
          this.error(err)
        }
        this.log('got it2')
        console.log(
          stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
          })
        )
      }
    )
  }
}

StartCommand.description = `Start lib development flow
...
Extra documentation goes here
`

module.exports = StartCommand

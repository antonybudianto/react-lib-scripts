const { Command } = require('@oclif/command')
const { spawn } = require('child_process')
const webpack = require('webpack')
const path = require('path')

const cwd = process.cwd()
const config = require('../webpack.config')

// console.log('path cwd', path.resolve(cwd))
// console.log('path dirname', path.resolve(__dirname))

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
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          return
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
          console.error(info.errors)
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings)
        }
        console.log(
          stats.toString({
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

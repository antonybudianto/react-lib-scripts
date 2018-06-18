const { Command } = require('@oclif/command')
const webpack = require('webpack')

const config = require('../webpack.config')

class StartCommand extends Command {
  async run() {
    const ins = webpack(config)
    ins.watch(
      {
        ignored: /node_modules/,
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
            modules: false,
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

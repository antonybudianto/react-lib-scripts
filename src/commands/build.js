const { Command } = require('@oclif/command')
const { spawn } = require('child_process')
const webpack = require('webpack')
const path = require('path')

const cwd = process.cwd()
const config = require('../webpack.config')

// console.log('path cwd', path.resolve(cwd))
// console.log('path dirname', path.resolve(__dirname))

class BuildCommand extends Command {
  async run() {
    const ins = webpack(config)
    ins.run((err, stats) => {
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
    })
  }
}

BuildCommand.description = `Create library bundle
...
Create library bundle
`

module.exports = BuildCommand

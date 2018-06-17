const { Command } = require('@oclif/command')
// const webpack = require('webpack')

// const config = require('../webpack.config')

class BuildCommand extends Command {
  async run() {
    // const ins = webpack(config)
    // ins.run((err, stats) => {
    //   if (err) {
    //     console.error(err.stack || err)
    //     if (err.details) {
    //       console.error(err.details)
    //     }
    //     return
    //   }
    //   const info = stats.toJson()
    //   if (stats.hasErrors()) {
    //     console.error(info.errors)
    //   }
    //   if (stats.hasWarnings()) {
    //     console.warn(info.warnings)
    //   }
    //   console.log(
    //     stats.toString({
    //       colors: true, // Shows colors in the console
    //     })
    //   )
    // })
  }
}

BuildCommand.description = `Create library bundle
...
Create library bundle
`

module.exports = BuildCommand

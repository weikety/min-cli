import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { DEFAULTS } from './const'

import Plugin = PluginHelper.Plugin
import PluginOptions = PluginHelper.Options
import Options = PluginAutoprefixer.Options

export default class PluginAutoprefixer implements Plugin {
  constructor (public options: Options) {
    this.options = Object.assign({}, DEFAULTS, this.options)
  }

  async apply (pluginOptions: PluginOptions): Promise<string> {
    let { filter, config } = this.options
    let { filename, content, output } = pluginOptions

    if (!filter.test(filename)) {
      return Promise.resolve(content)
    }
    else {
      output('变更', filename)

      let processor = postcss([
        autoprefixer(config)
      ])
      return processor.process(content).then(result => result.css)
    }
  }
}
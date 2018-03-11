import { pd } from 'pretty-data'
import { DEFAULTS } from './const'

import Plugin = PluginHelper.Plugin
import PluginOptions = PluginHelper.Options
import Options = PluginFilemin.Options

export default class PluginFilemin implements Plugin {

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
      output('压缩', filename)

      if (/\.(wxml|xml)$/.test(filename)) {
        content = pd.xmlmin(content)
      }
      else if (/\.wxss$/.test(filename)) {
        content = pd.cssmin(content)
      }
      else if (/\.json$/.test(filename)) {
        content = pd.jsonmin(content)
      }

      return Promise.resolve(content)
    }
  }
}
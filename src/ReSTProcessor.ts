import { parse, ParseOption } from './rst-to-ast'

export type RestProcessorOptions = {
  extensions?: string[]
  parseCommand?: string
  debug?: boolean
}

export default class ReSTProcessor {
  options: RestProcessorOptions
  extensions: string[]

  constructor(options: RestProcessorOptions) {
    this.options = options
    this.extensions = options.extensions ? options.extensions : []
  }

  availableExtensions() {
    return ['.rst', '.rest'].concat(this.extensions)
  }

  processor(ext: string) {
    return {
      preProcess: (text: string, filePath?: string) => {
        let debug: boolean
        if (this.options.debug) {
          debug = this.options.debug
        } else if (process.env.DEBUG?.startsWith("textlint:rst")) {
          debug = true
        } else {
          debug = false
        }
        const parseOption: ParseOption = {
          parseCommand: this.options.parseCommand ? this.options.parseCommand : 'rst2ast -q',
          debug: debug,
        }
        return parse(text, parseOption)
      },
      postProcess: (messages: any[], filePath?: string) => {
        return {
          messages,
          filePath: filePath ? filePath : '<rst>',
        }
      },
    }
  }
}

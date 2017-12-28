'use strict'

const { BaseTag } = require('edge.js')
const ParamCase = require('param-case')

class RenderScriptsTag extends BaseTag {

  constructor (viewbag) {
    super()

    this.viewbag = viewbag
  }

  get tagName () {
    return 'viewbagRenderScripts'
  }

  get isBlock () {
    return false
  }

  compile ({ buffer }) {
    let metaTags = this.viewbag.getScriptTags()

    metaTags.map(item => {
      delete item.type

      let attrs = "", key, value

      if (Object.keys(item).indexOf('type') == -1) {
        attrs += ` type="text/javascript"`
      }

      for (let key in item) {
        key = ParamCase(key)
        value = item[key]
        attrs += ` ${key}="${value}"`
      }

      buffer.writeToOutput(`<script${attrs}></script>`)
    })
  }

  run () {
  }

  toObject () {
    return {
      name: this.tagName,
      isBlock: !!this.isBlock,
      compile: this.compile.bind(this),
      run: this.run.bind(this)
    }
  }
}

module.exports = RenderScriptsTag

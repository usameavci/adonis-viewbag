'use strict'

const { BaseTag } = require('edge.js')
const ParamCase = require('param-case')

class RenderMetasTag extends BaseTag {

  constructor (viewbag) {
    super()

    this.viewbag = viewbag
  }

  get tagName () {
    return 'viewbagRenderMetas'
  }

  get isBlock () {
    return false
  }

  compile ({ buffer }) {
    let metaTags = this.viewbag.getMetaTags()

    metaTags.map(item => {
      delete item.type

      let attrs = "", key, value

      for (let key in item) {
        key = ParamCase(key)
        value = item[key]
        attrs += ` ${key}="${value}"`
      }

      buffer.writeToOutput(`<meta${attrs}>`)
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

module.exports = RenderMetasTag

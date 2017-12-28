'use strict'

const { BaseTag } = require('edge.js')
const ParamCase = require('param-case')

class RenderStylesTag extends BaseTag {

  constructor (viewbag) {
    super()

    this.viewbag = viewbag
  }

  get tagName () {
    return 'viewbagRenderStyles'
  }

  get isBlock () {
    return false
  }

  compile ({ buffer }) {
    let metaTags = this.viewbag.getStyleTags()

    metaTags.map(item => {
      delete item.type

      let attrs = "", key, value

      if (Object.keys(item).indexOf('rel') == -1) {
        attrs += ` rel="stylesheet"`
      }

      for (let key in item) {
        key = ParamCase(key)
        value = item[key]
        attrs += ` ${key}="${value}"`
      }

      buffer.writeToOutput(`<link${attrs}>`)
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

module.exports = RenderStylesTag

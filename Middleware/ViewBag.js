'use strict'

const Path = require('path')
const RenderMetasTag = require('../src/Tags/RenderMetasTag')
const RenderScriptsTag = require('../src/Tags/RenderScriptsTag')
const RenderStylesTag = require('../src/Tags/RenderStylesTag')

class ViewBag {
  constructor (Env, View) {
    this.Env = Env
    this.View = View
  }

  async handle ({ request, viewbag, view, response }, next) {
    const metaTag = new RenderMetasTag(viewbag)
    const scriptsTag = new RenderScriptsTag(viewbag)
    const stylesTag = new RenderStylesTag(viewbag)

    view._tags[metaTag.tagName] = metaTag.toObject()
    view._tags[scriptsTag.tagName] = scriptsTag.toObject()
    view._tags[stylesTag.tagName] = stylesTag.toObject()

    view.render = (...params) => {
      const viewname = params[0]
      params.splice(0,1)

      params = params.map(item => {
        if (item.constructor.name == 'ViewBag') {
          item = item.toObject()
        }

        return item
      })

      return this.View.render(viewname, ...params)
    }

    this.View.global('asset', (url) => {
      if (this.Env.get('NODE_ENV') == 'production') {
        const manifestPath = Path.join(__dirname, '../..', 'public', 'assets', 'manifest.json')
        const manifest = require(manifestPath)
        const manifestUrl = manifest.hasOwnProperty(url) ? manifest[url] : url
        url = `assets/${manifestUrl}`
      }

      return url
    })

    await next()
  }
}

module.exports = ViewBag

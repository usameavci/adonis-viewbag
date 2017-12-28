'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const ViewBag = require('../src/ViewBag')
const ViewBagMiddleware = require('../Middleware/ViewBag')

class ViewBagProvider extends ServiceProvider {

  register () {
    this.app.bind('Adonis/Middleware/ViewBag', function (app) {
      const View = app.use('Adonis/Src/View')
      const Env = app.use('Adonis/Src/Env')

      return new ViewBagMiddleware(Env, View)
    })
  }

  async boot () {
    const HttpContext = this.app.use('Adonis/Src/HttpContext')

    HttpContext.getter('viewbag', function () {
      return new ViewBag()
    }, true)
  }
}

module.exports = ViewBagProvider

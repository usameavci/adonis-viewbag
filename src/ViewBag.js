class ViewBag {
  constructor (options) {
    this.items = []
    this.options = options || {}

    return this
  }

  add (...params) {
    let item = {}
    let key
    let value
    let type

    if (params.length === 1 && params[0].constructor.name === 'Object') {
      item = params[0]
    } else if (params.length === 2) {
      if (params[0] == 'style') {
        item = {
          type: params[0],
          href: params[1]
        }
      } else if (params[0] == 'script') {
        item = {
          type: params[0],
          src: params[1]
        }
      } else {
        item = {
          key: params[0],
          value: params[1]
        }
      }
    } else if (params.length === 3) {
      item = {
        key: params[1],
        value: params[2],
        type: params[0]
      }
    }

    if (item.type === 'meta' && item.key) {
      item.name = item.key
      delete item.key
    }

    if (item.type === 'meta' && item.value) {
      item.content = item.value
      delete item.value
    }

    this.items.push(item)
  }

  replace (key, value) {
    this.items = this.items.map(item => {
      if (item.key === key) {
        item = value
      }

      return item
    })
  }

  remove (key) {
    this.items = this.items.filter(item => item.key !== key)
  }

  get (key) {
    const itemsFound = this.items.filter(item => item.key === key)

    if (itemsFound.length === 1) {
      return itemsFound[0]
    } else if (itemsFound.length > 1) {
      return itemsFound
    } else {
      return undefined
    }
  }

  getValue (key) {
    const item = this.get(key)
    if (!item) {
      return null
    }

    return item.value
  }

  getMetaTags () {
    return this.items.filter(item => item.type === 'meta') || []
  }

  getStyleTags () {
    return this.items.filter(item => item.type === 'style') || []
  }

  getScriptTags () {
    return this.items.filter(item => item.type === 'script') || []
  }

  toObject () {
    let obj = {}
    this.items.filter(item => !item.type).map(item => {
      obj[item.key] = item.value

      return item
    })

    return obj
  }

  toArray () {
    return this.items
  }

}

module.exports = ViewBag

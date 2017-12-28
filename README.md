# Adonis ViewBag
A helper for the data to be transferred to the view

[![npm version](https://badge.fury.io/js/adonis-viewbag.svg)](https://badge.fury.io/js/adonis-viewbag)
[![npm](https://img.shields.io/npm/dt/adonis-viewbag.svg)](https://www.npmjs.com/package/adonis-viewbag)

### Compatibility
------------------------------

| Framework Version | Version | Status |
|-------------------:|:--------:|:--------:|
| `@adonis/framework` |^4 | √ |
| `@adonis/framework` |3.* | not tested |
|------------------------------|


### Installation
------------------------------

To get the latest version of Adonis Viewbag, simply run

```
yarn add adonis-viewbag
// or
// npm install adonis-viewbag --save
```

Once Adonis Viewbag is installed, you need to register the service provider.
Open up `start/app.js` and add the following to the providers key.

```js
const providers = [
  ...,
  'adonis-viewbag/Providers/ViewBagProvider',
]
```

Enable the throttle middleware inside `start/kernel.js` file.

```js
const globalMiddleware = [
  ...,
  'Adonis/Middleware/ViewBag'
}
```

### Usage
------------------------------

#### How to pass data to view
You can use the `viewbag.add()` method in context for passing data to view
**For Example :**

```js
class MainController {
    async index ({ locale, view, viewbag }) {
        viewbag.add('locale', locale)
        viewbag.add('title', `This is page title`)
        return view.render('index', viewbag)
    }
}
```

### Tags
------------------------------

You can quickly render items of type `meta`,` style` and `script` using tags.

**Available Tags**

 - @viewbagRenderMetas
 - @viewbagRenderStyles
 - @viewbagRenderScripts

##### Tags Usage
**File:** `app/Controllers/Http/MainController.js`
```js
// Add meta tag
viewbag.add('meta', 'description', `Meta description`)
// or
viewbag.add({ type: 'meta', httpEquiv: 'Content-Type', content: `text/html; charset=UTF-8` })

// Add style tag
viewbag.add('style', 'styles/home.css')
// or
viewbag.add({ type: 'style', href: 'scripts/home.js' })

// Add script tag
viewbag.add('script', 'scripts/home.js')
// or
viewbag.add({ type: 'script', src: 'scripts/home.js' })
```

**File:** `resources/views/index.edge`

```html
...
<head>
  <meta charset="UTF-8" />
  <title>{{ title }}</title>
  @viewbagRenderMetas()
  @viewbagRenderStyles()
  @viewbagRenderScripts()
</head>
<body>
...
```

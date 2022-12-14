# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

# Initialize a new project (Vue 3 + TypeScript + Vite)

```
npm init vite -- --template vue-ts my-app
```
### Cd into `my-app` and run 

```
npm install
```

### Start Project 

```
npm run dev
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

# Setup Project 

### Clone the repo 

```
git clone https://github.com/jareerzeenam/vue3-composition-api-blog.git
```
### Clone the repo 

```
cd vue3-composition-api-blog
```
### Start Project 

```
npm run dev
```
### Start Node Server

```
npm run server
```


## CSS Framework 
- [Bulma: CSS framework](https://bulma.io/) [CDN](https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css)

## Packages
- [Luxon: Wrapper for JavaScript dates and times](https://moment.github.io/luxon/#/)
- [Pinia: Vue Store for state management](https://pinia.vuejs.org/)
- [Marked: A markdown parser and compiler](https://marked.js.org/)
- [Highlight.js: Syntax highlighting for the Web](https://highlightjs.org/)
- [Lodash: Used for debounced function](https://lodash.com/docs/4.17.15#debounce)
- [Body Parser: Node.js body parsing middleware.](https://www.npmjs.com/package/body-parser)
- [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Express Sessions](http://expressjs.com/en/resources/middleware/session.html)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)

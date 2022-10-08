# vite-project-ts

Quick start with Vue 3 in Vite.

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 📦 [Components auto importing](./src/components)

- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)

- ✅ Use [Vitest](http://vitest.dev/) for unit and components testing

- 🎉 Use [Pina](https://pinia.vuejs.org/) for vue store

- 🎨 [Element Plus](https://element-plus.gitee.io/) a Vue 3 based component library for designers and developers

- 🌐 [Axios](https://axios-http.com/) Promise based HTTP client for the browser and node.js

- 📈 [useECharts](./src/composables/useECharts.ts) Vue composable for [Apache ECharts](https://echarts.apache.org/).

- 🦾 TypeScript, of course

- ☁️ Deploy on Netlify, zero-config

## Try it now!

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit cyw666/vite-project-ts my-vite-project-ts
cd my-vite-project-ts
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# dpd

### Реализована таблица с данными, пагинацией и поиском

На каждой странице выводится максимум 20 строк, пользователь может выбрать конкретную страницу для перехода.

Поиск работает по вводимому пользователем ключевому слову (для всех текстовых значений).

Также работает сортировка по выбранной пользователем колонке (за исключением аватара). При сортировке по колонке с именем - сортировка идет по фамилии, третье слово в строке.

Все фильтры, параметры сортировки и страница хранятся в query-параметрах, что позволяет сохранять фильтры после перезагрузки страницы.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

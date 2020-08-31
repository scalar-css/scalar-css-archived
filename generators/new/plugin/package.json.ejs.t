---
to: "packages/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>/package.json"
---
{
  "name": "@scalar-css/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>",
  "version": "0.0.0",
  "description": "",
  "license": "MIT",
  "main": "src/index.js",
  "scripts": {
    "dev": "jest --watch",
    "test": "jest"
  },
  "dependencies": {
    "postcss": "7.0.21"
  },
  "devDependencies": {
    "jest": "24.9.0"
  },
  "homepage": "https://www.scalar-css.com",
  "repository": "https://github.com/scalar-css/scalar-css",
  "bugs": "https://github.com/scalar-css/scalar-css/issues",
  "author": {
    "name": "Kether Saturnius",
    "email": "iamkether@gmail.com",
    "url": "https://www.k3th3r.com"
  },
  "keywords": [
    "css",
    "modular scale",
    "typography",
    "fluid web design",
    "scalar-css",
    "postcss",
    "postcss-plugin",
    "css utilities"
  ],
  "engines": {
    "node": ">=12.11.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/scalar-css/scalar-css",
    "directory": "packages/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}

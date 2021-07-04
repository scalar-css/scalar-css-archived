---
to: "packages/<%= h.changeCase.paramCase(name) %>/package.json"
---
{
  "name": "@scalar-css/<%= h.changeCase.paramCase(name) %>",
  "version": "0.0.0",
  "description": "Scalar CSS plugin for",
  "license": "MIT",
  "main": "src/index.js",
  "homepage": "https://scalar-css.com",
  "bugs": "https://github.com/scalar-css/scalar-css/issues",
  "author": {
    "name": "Kether Saturnius",
    "email": "iamkether@gmail.com",
    "url": "https://www.k3th3r.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/scalar-css/scalar-css",
    "directory": "packages/<%= h.changeCase.paramCase(name) %>"
  },
  "engines": {
    "node": ">=v14.16",
    "npm": ">=7.7"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "keywords": [
    "css",
    "scalar-css",
    "scalar unit",
    "modular scale",
    "typography",
    "fluid web design",
    "postcss",
    "postcss-plugin",
    "css utilities"
  ],
}

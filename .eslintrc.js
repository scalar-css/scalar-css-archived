module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'vue'],
  rules: {
    curly: ['error', 'all'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'require-jsdoc': 0,
    'max-len': 0,
    'prettier/prettier': 'error',
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [
          'component',
          'template',
          'transition',
          'transition-group',
          'keep-alive',
          'slot',
        ],
      },
    ],
    'vue/no-v-html': 'off',
  },
}

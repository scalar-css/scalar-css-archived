module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.js',
    '!packages/scalar-css-preset-*/src/*.js',
    '!packages/*/src/defaults/*.js'
  ],
  coverageReporters: ['text', 'html', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000
}

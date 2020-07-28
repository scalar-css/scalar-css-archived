module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.js',
    '!packages/*/src/defaults/*.js'
  ],
  coverageReporters: ['text', 'html', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000
}

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/src/**/*.js'],
  coverageReporters: ['text', 'html', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 30000,
}

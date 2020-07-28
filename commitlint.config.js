module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['wip', 'docs', 'feat', 'fix', 'test', 'chore']],
    'scope-enum': [2, 'always', ['docs', 'packages', 'repo', 'release']]
  }
}

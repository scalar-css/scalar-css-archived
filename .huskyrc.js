const runYarnLock = 'yarn install --frozen-lockfile'

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runYarnLock}`,
    'post-merge': runYarnLock,
    'post-rebase': runYarnLock,
    'pre-commit': 'yarn lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}

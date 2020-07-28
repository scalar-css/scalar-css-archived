const inquirer = require('inquirer')
const commitlintConfig = require('./commitlint.config')

function prompter(cz, commit) {
  const scopes = commitlintConfig.rules['scope-enum'][2]

  // the 'release' scope should only be used by lerna/CI
  scopes.splice(scopes.indexOf('release', 1))

  const types = [
    { value: 'wip', name: '🚧 wip:   Work in progress' },
    { value: 'docs', name: '📚 docs:  Documentation updates' },
    { value: 'feat', name: '✨ feat:  A new feature' },
    { value: 'fix', name: '🐛 fix:   A bug fix' },
    { value: 'test', name: '✅ test:  Adding/updating tests' },
    {
      value: 'chore',
      name: '🔧 chore: Changes to the build process, tools or libraries'
    }
  ]

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What type of update are you making? (required)\n',
        choices: types,
        pageSize: 8,
        validate: type => types.includes(type)
      },
      {
        type: 'list',
        name: 'scope',
        message: 'Where are you making the update? (required)\n',
        choices: scopes,
        validate: scope => scopes.includes(scope)
      },
      {
        type: 'input',
        name: 'title',
        message: 'Git commit title (required):\n',
        validate: input => {
          if (!input) {
            return 'You must provide a commit title'
          }

          if (input.length > 100) {
            return 'Commit titles are limited to 100 characters in length'
          }

          return true
        }
      }
    ])
    .then(answers => {
      formatCommit(commit, answers)
    })
}

/**
 * For the responses to match the Conventional Commits format
 */
function formatCommit(commit, answers) {
  commit(`
    ${answers.type}(${answers.scope}): ${answers.title}
`)
}

module.exports = {
  prompter,
  formatCommit
}

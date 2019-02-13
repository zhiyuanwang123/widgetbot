const path = require('path')
const fs = require('fs')
const { ncp } = require('ncp')
const chalk = require('chalk')
const R = require('ramda')
const yaml = require('node-yaml')

const root = path.join(__dirname, '../..')
const package = require('../../package.json')
const basePackage = require('./files/package.json')

const newPackage = {
  ...basePackage,
  author: package.author,
  dependencies: {
    ...R.pickBy(
      (_, package) => !package.startsWith('@types'),
      package.dependencies
    ),
    ...basePackage.dependencies
  }
}

ncp(path.join(__dirname, './files'), path.join(root, './dist'), err => {
  if (err) throw err

  // Write the new package
  fs.writeFileSync(
    path.join(root, './dist/package.json'),
    JSON.stringify(newPackage, null, 2)
  )

  // Copy over config template
  ncp(
    path.join(root, './data/config.template.yml'),
    path.join(root, './dist/data/config.template.yml'),
    () => {}
  )

  fs.writeFileSync(
    path.join(root, './dist/data/config.template.js'),
    `
/**
 * Find detailed documentation over at ↓
 * https://docs.widgetbot.io/self-hosted/config/
 */

module.exports = ${JSON.stringify(
      yaml.readSync(path.join(root, './data/config.template.yml')),
      null,
      2
    )}`
  )
})

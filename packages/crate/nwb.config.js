const baseConfig = require('../../scripts/nwb.config')

const config = baseConfig()
config.npm.umd.global = 'Crate'

module.exports = config

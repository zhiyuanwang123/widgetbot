import is from '@sindresorhus/is'
import fs from 'fs'
import yaml from 'node-yaml'
import path from 'path'
import { data } from '@utils/paths'

import Config, { OptionalConfig } from '@entities/Config'

const paths = {
  yml: path.join(data, 'config.yml'),
  js: path.join(data, 'config.js')
}

const js = fs.existsSync(paths.js) ? eval(`require(paths.js)`) : null
const yml = fs.existsSync(paths.yml) ? yaml.readSync(paths.yml) : null

const userConfig = (is.function_(js) ? js() : js) || yml

export const defaultConfig: OptionalConfig = {
  development: process.env.NODE_ENV === 'development',
  signum: `https://signum.widgetbot.io`
}

const config = { ...defaultConfig, ...userConfig } as Config

export default config

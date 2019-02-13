import { IHelp } from 'engine/commands/types'
import * as R from 'ramda'

export type Command = [string, IHelp]

const modules = require.context('../', true, /.\/*[a-zA-Z]\/index$/)

const getName = path => path.split('/')[1]
const getHelp = (paths): Command[] =>
  paths.map(path => [getName(path), modules(path).help])
const filterHelp = (commands: Command[]) =>
  commands.filter(command => !!command[1])

const commands = R.pipe(
  getHelp,
  filterHelp
)(modules.keys())

export default commands

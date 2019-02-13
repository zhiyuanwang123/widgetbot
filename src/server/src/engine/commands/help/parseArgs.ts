import * as R from 'ramda'

const joinArgs = (args: string[]) => args.join(' | ')
const mergeArgs = (args: (string | string[])[]) =>
  args.map(arg => (arg instanceof Array ? joinArgs(arg) : arg))
const prettifyArgs = (args: string[]) =>
  `__(__${args.join('__)__ __(__)')}__)__`

const parseArgs = R.pipe(
  mergeArgs,
  prettifyArgs
)

export default parseArgs

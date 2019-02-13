import { client } from 'engine'
import * as R from 'ramda'

const prettifyExamples = (command, examples) =>
  examples.map(
    example => `:pencil: <@!${client.user.id}> __${command}__ __${example}__`
  )
const joinExamples = examples => examples.join('\n')

const parseExamples = R.pipe(
  prettifyExamples,
  joinExamples
)

export default parseExamples

import { GraphQLScalarType, Kind } from 'graphql'
import { inspect } from 'util'

export const Snowflake = new GraphQLScalarType({
  name: 'Snowflake',
  description:
    'These IDs are unique 64-bit unsigned integers, which are based on time, instead of being sequential.',
  parseValue(value: string) {
    if (typeof value === 'string') return value
    if (typeof value === 'number') return new String(value)
    throw new TypeError(`Snowflake cannot represent value: ${inspect(value)}`)
  },
  serialize(value: string) {
    if (typeof value === 'string') return value
    if (typeof value === 'number') return new String(value)
    throw new TypeError(`Snowflake cannot represent value: ${inspect(value)}`)
  },
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      const id = +ast.value
      if (!isNaN(id) && id < 9223372036854775807) {
        return ast.value.toString()
      }
    }
    return undefined
  }
})

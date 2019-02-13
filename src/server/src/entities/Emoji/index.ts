import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
class Emoji {
  @Field() name: string
}

export default Emoji

export * from './CustomEmoji'
export * from './TextEmoji'

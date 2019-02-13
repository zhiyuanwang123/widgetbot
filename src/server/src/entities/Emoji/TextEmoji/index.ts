import { ObjectType, Field } from 'type-graphql'
import Emoji from '@entities/Emoji'

@ObjectType({ implements: Emoji })
export class TextEmoji extends Emoji {
  @Field() utf8: string
}

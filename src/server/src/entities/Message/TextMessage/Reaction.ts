import { Field, ObjectType } from 'type-graphql'
import Emoji from '@entities/Emoji'

@ObjectType()
export class Reaction {
  @Field(type => Emoji)
  emoji: Emoji

  @Field() count: number
}

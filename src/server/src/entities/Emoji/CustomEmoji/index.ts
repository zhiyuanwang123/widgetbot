import { ObjectType, Field } from 'type-graphql'
import Emoji from '@entities/Emoji'
import { Snowflake } from '@utils/scalars'

@ObjectType({ implements: Emoji })
export class CustomEmoji extends Emoji {
  @Field() animated: boolean

  @Field(type => Snowflake)
  id: string

  @Field() identifier: string

  @Field() url: string
}

import { Field, ObjectType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@ObjectType()
export class GuildGuest {
  @Field(type => Snowflake)
  id: string

  @Field({ nullable: true })
  nickname?: string

  // @Field()
  // online: boolean
}

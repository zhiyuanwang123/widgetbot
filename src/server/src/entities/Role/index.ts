import { Field, ID, ObjectType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'
import Guild from '@entities/Guild'

@ObjectType()
class Role {
  @Field() createdAt: Date
  @Field() name: string
  @Field() hexColor: string
  @Field() mentionable: boolean
  @Field() position: number

  @Field(type => Snowflake)
  id: string

  @Field(type => Guild)
  guild: Guild
}

export default Role

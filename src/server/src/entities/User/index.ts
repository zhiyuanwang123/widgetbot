import { Snowflake } from '@utils/scalars'
import { Field, ObjectType } from 'type-graphql'

import Presence from './Presence'

export type UserType = 'bot' | 'sysadmin' | 'guest' | 'member'

@ObjectType()
class User {
  @Field() username: string
  @Field() discriminator: string
  @Field() bot: boolean
  @Field() type: UserType

  @Field({ nullable: true })
  avatarURL?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field(type => Snowflake)
  id: string

  @Field({ nullable: true })
  avatar?: string

  @Field(type => Presence)
  presence: Presence
}

export default User

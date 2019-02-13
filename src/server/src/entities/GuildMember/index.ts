import { ObjectType, Field } from 'type-graphql'
import User from '@entities/User'
import Guild from '@entities/Guild'

@ObjectType({ implements: User })
class GuildMember extends User {
  @Field() displayHexColor: string

  @Field() displayName: string

  // @Field(type => [Role])
  // roles: Role[]

  @Field({ nullable: true })
  nickname?: string

  @Field({ nullable: true })
  joinedAt?: Date

  @Field(type => Guild)
  guild: Guild
}

export default GuildMember
export * from './createGuildMember'

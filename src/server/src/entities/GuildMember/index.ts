import { ObjectType, Field } from 'type-graphql'
import Guild from '@entities/Guild'
import User from '@entities/User'
import { IMember } from '@entities/IMember/IMember'
import Role from '@entities/Role'

@ObjectType({ implements: IMember })
class GuildMember extends IMember {
  @Field(type => User)
  user: User

  @Field({ nullable: true })
  nickname?: string

  @Field({ nullable: true })
  joinedAt?: Date

  @Field(type => [Role])
  roles: Role[]

  @Field(type => Guild)
  guild: Guild
}

export default GuildMember

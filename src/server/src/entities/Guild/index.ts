import { Field, ID, ObjectType } from 'type-graphql'
import CategoryChannel from '@entities/CategoryChannel'
import GuildChannel from '@entities/GuildChannel'
import TextChannel from '@entities/TextChannel'
import { Snowflake } from '@utils/scalars'
import Theme from '@entities/Theme'
import { GuildGuest } from './GuildGuest'
import { GuildBan } from '@entities/Guild/GuildBans'

@ObjectType()
export default class Guild {
  @Field() createdAt: Date
  @Field() available: boolean
  @Field() afkTimeout: number

  @Field() icon: string
  @Field() iconURL: string
  @Field() joinedAt: Date

  @Field() large: boolean
  @Field() memberCount: number
  @Field() verificationLevel: number

  @Field() name: string
  @Field() nameAcronym: string

  @Field(type => Snowflake)
  id: string

  @Field(type => GuildChannel)
  channels: (TextChannel | CategoryChannel)[]

  // @Field(type => GuildMember) owner: GuildMember

  @Field(type => Theme)
  theme: Theme

  @Field(type => Snowflake)
  ownerID: string

  @Field(type => ID)
  region: string

  @Field(type => [GuildGuest])
  guests: GuildGuest[]

  @Field(type => GuildGuest, { nullable: true })
  me?: GuildGuest

  @Field(type => [GuildBan])
  bans: GuildBan[]
}

export * from './args'
export * from './GuildGuest'
export * from './GuildBans'

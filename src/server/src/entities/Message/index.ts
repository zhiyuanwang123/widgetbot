import { Field, ID, InterfaceType, ObjectType } from 'type-graphql'
import User from '@entities/User'
import { Snowflake } from '@utils/scalars'
import Channel from '@entities/Channel'
import Guild from '@entities/Guild'
import GuildMember from '@entities/GuildMember'
import Member from '@entities/Member'
import GuestMember from '@entities/GuestMember'
import { JoinMessage } from './JoinMessage'
import { TextMessage } from './TextMessage'
import { PinnedMessage } from './PinnedMessage'

@InterfaceType()
export default class Message {
  @Field(type => Snowflake, { description: 'Message ID' })
  id: string

  @Field(type => User, { description: 'Message author' })
  author: GuildMember | Member | GuestMember

  @Field(type => Channel)
  channel: Channel

  @Field(type => Guild)
  guild: Guild

  @Field({ description: 'Message timestamp' })
  createdAt: Date

  @Field({ description: 'Time the message was edited', nullable: true })
  editedAt?: Date
}

export type IMessage = JoinMessage | TextMessage | PinnedMessage

export * from './JoinMessage'
export * from './PinnedMessage'
export * from './TextMessage'

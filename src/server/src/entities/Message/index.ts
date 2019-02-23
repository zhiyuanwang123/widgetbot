import { Field, InterfaceType, createUnionType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'
import Guild from '@entities/Guild'
import { JoinMessage } from './JoinMessage'
import { TextMessage } from './TextMessage'
import { PinnedMessage } from './PinnedMessage'
import Channel from '@entities/Channel'
import { IMember } from '@entities/IMember'

@InterfaceType()
export default class Message {
  @Field(type => Snowflake, { description: 'Message ID' })
  id: string

  @Field(type => IMember, { description: 'Message author' })
  author: IMember

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

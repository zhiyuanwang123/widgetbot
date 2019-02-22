import { Snowflake } from '@utils/scalars'
import { Field, ObjectType } from 'type-graphql'
import Channel from '@entities/Channel'
import Message from '@entities/Message'
import CategoryChannel from '@entities/CategoryChannel'

@ObjectType({ implements: Channel })
export default class TextChannel extends Channel {
  @Field(type => Snowflake, { nullable: true })
  lastMessageID: string

  @Field({ nullable: true })
  topic: string

  @Field(type => [Message], { nullable: true })
  messages?: Message[]

  @Field() nsfw: boolean

  @Field(type => CategoryChannel, { nullable: true })
  parent?: CategoryChannel
}

export * from './args'

import { Snowflake } from '@utils/scalars'
import { Field, ObjectType } from 'type-graphql'
import GuildChannel from '@entities/GuildChannel'
import Message from '@entities/Message'
import CategoryChannel from '@entities/CategoryChannel'

@ObjectType({ implements: GuildChannel })
export default class TextChannel extends GuildChannel {
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

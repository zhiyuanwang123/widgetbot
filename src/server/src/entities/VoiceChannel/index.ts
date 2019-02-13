import { Field, ObjectType } from 'type-graphql'
import GuildChannel from '@entities/GuildChannel'
import CategoryChannel from '@entities/CategoryChannel'

@ObjectType({ implements: GuildChannel })
export default class VoiceChannel extends GuildChannel {
  @Field() bitrate: number
  @Field() full: boolean
  @Field() joinable: boolean
  @Field() speakable: boolean
  @Field() userLimit: boolean

  @Field(type => CategoryChannel, { nullable: true })
  parent?: CategoryChannel
}

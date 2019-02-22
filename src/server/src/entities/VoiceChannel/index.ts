import { Field, ObjectType } from 'type-graphql'
import Channel from '@entities/Channel'
import CategoryChannel from '@entities/CategoryChannel'

@ObjectType({ implements: Channel })
export default class VoiceChannel extends Channel {
  @Field() bitrate: number
  @Field() full: boolean
  @Field() joinable: boolean
  @Field() speakable: boolean
  @Field() userLimit: boolean

  @Field(type => CategoryChannel, { nullable: true })
  parent?: CategoryChannel
}

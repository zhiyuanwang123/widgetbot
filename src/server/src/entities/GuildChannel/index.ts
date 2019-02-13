import { Field, ID, InterfaceType } from 'type-graphql'
import Channel from '@entities/Channel'
import Guild from '@entities/Guild'
import CategoryChannel from '@entities/CategoryChannel'

@InterfaceType()
export default class GuildChannel extends Channel {
  @Field() name: string

  @Field() position: number

  @Field(type => Guild)
  guild: Guild

  @Field({ nullable: true })
  calculatedPosition: number
}

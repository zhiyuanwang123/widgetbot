import { Field, ObjectType } from 'type-graphql'
import Channel from '@entities/Channel'
import TextChannel from '@entities/TextChannel'

@ObjectType({ implements: Channel })
export default class CategoryChannel extends Channel {
  @Field(type => TextChannel)
  children: TextChannel
}

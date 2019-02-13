import { Field, ObjectType } from 'type-graphql'
import GuildChannel from '@entities/GuildChannel'
import TextChannel from '@entities/TextChannel'

@ObjectType({ implements: GuildChannel })
export default class CategoryChannel extends GuildChannel {
  @Field(type => TextChannel)
  children: TextChannel
}

import { Field, ObjectType } from 'type-graphql'

import { EmbedField } from './EmbedField'
import { EmbedFooter } from './EmbedFooter'
import { EmbedThumbnail } from './EmbedThumbnail'
import { EmbedVideo } from './EmbedVideo'

@ObjectType()
export class Embed {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  url?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  timestamp?: Date

  @Field({ nullable: true })
  hexColor?: string

  @Field(type => [EmbedField])
  fields: EmbedField[]

  @Field(type => EmbedFooter, { nullable: true })
  footer?: EmbedFooter

  @Field(type => EmbedThumbnail, { nullable: true })
  thumbnail?: EmbedThumbnail

  // @Field(type => EmbedAuthor, { description: '' })
  // author: EmbedAuthor

  @Field(type => EmbedVideo, { nullable: true })
  video?: EmbedVideo
}

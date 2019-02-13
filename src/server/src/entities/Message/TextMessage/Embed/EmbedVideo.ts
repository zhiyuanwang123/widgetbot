import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class EmbedVideo {
  @Field() height: number
  @Field() width: number
  @Field() url: string
}

import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class EmbedImage {
  @Field() height: number
  @Field() width: number
  @Field() proxyURL: string
  @Field() url: string
}

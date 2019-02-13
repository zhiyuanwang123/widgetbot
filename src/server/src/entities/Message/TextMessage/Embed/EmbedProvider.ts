import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class EmbedProvider {
  @Field() name: string
  @Field() url: string
}

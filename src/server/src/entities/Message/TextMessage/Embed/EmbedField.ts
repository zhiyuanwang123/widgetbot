import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class EmbedField {
  @Field() value: string
  @Field() name: string
  @Field() inline: boolean
}

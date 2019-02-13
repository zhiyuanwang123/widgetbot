import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Attachment {
  @Field() url: string
  @Field() height: number
  @Field() width: number
}

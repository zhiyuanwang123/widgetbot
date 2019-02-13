import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class EmbedFooter {
  @Field({ nullable: true })
  iconURL?: string

  @Field({ nullable: true })
  proxyIconURL?: string

  @Field() text: string
}

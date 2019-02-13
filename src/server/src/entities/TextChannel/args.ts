import { Min, Max } from 'class-validator'
import { ArgsType, Field, ID } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

const API_MESSAGE_LIMIT = 100

@ArgsType()
export class MessagesArgs {
  @Field({ nullable: true })
  @Min(0)
  @Max(API_MESSAGE_LIMIT)
  limit?: number

  @Field(type => Snowflake, { nullable: true })
  around?: string

  @Field(type => Snowflake, { nullable: true })
  before?: string

  @Field(type => Snowflake, { nullable: true })
  after?: string
}

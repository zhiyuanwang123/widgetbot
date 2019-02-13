import { Field, ID, ArgsType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@ArgsType()
export class SendMessageArgs {
  // @Field(type => Snowflake)
  // server: string

  @Field(type => Snowflake)
  channel: string

  @Field() content: string
}

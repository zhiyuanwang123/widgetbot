import { ArgsType, Field, ID } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@ArgsType()
export class ChannelArgs {
  @Field(type => Snowflake)
  id: string
}

import { ArgsType, Field, ID } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@ArgsType()
export class GuildArgs {
  @Field(type => Snowflake)
  id: string
}

@ArgsType()
export class GuildChannelArgs {
  @Field({ nullable: true })
  type?: string
}

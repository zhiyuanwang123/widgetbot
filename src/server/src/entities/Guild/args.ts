import { ArgsType, Field, ID } from 'type-graphql'
import { Snowflake, GuestSnowflake } from '@utils/scalars'

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

@ArgsType()
export class GuildBanArgs {
  @Field(type => Snowflake)
  guild: string

  @Field({ nullable: true })
  ip?: string

  @Field(type => GuestSnowflake)
  id?: string
}

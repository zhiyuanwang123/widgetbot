import { ArgsType, Field, ID, InputType, InterfaceType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'
import { Message } from '@widgetbot/discord.js'

@InterfaceType()
export class SubFilter {
  @Field(type => Snowflake)
  guild: string

  @Field(type => Snowflake)
  channel: string
}

@InputType()
export class IFilter {
  @Field(type => Snowflake, { nullable: true })
  guild?: string

  @Field(type => Snowflake, { nullable: true })
  channel?: string
}

@ArgsType()
export class Filter {
  @Field(type => IFilter, { nullable: true })
  filter: IFilter
}

/**
 * Helper function to filter the data based on the payload
 */
export const filter = ({
  payload,
  args: { filter }
}: {
  payload: Message | Message[]
  args: Filter
}) => {
  const message = payload instanceof Array ? payload[0] : payload

  if (!filter || !message) return true
  if (filter.guild && filter.guild !== message.guild.id) return false
  if (filter.channel && filter.channel !== message.channel.id) return false

  return true
}

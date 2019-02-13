import { ArgsType, Field, ID, InputType, InterfaceType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

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
  payload: IFilter & { [key: string]: any }
  args: Filter & { [key: string]: any }
}) => {
  if (!filter || !payload) return true
  if ('guild' in filter && filter.guild !== payload.guild) return false
  if ('channel' in filter && filter.channel !== payload.channel) return false

  return true
}

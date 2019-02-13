import { Field, InterfaceType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'

@InterfaceType()
export default class Channel {
  @Field({ nullable: true })
  createdAt?: Date

  @Field(type => Snowflake)
  id: string
}

export * from './args'

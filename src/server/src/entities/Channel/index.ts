import { Field, InterfaceType } from 'type-graphql'
import { Snowflake } from '@utils/scalars'
import Guild from '@entities/Guild'

@InterfaceType()
export default class Channel {
  @Field() name: string
  @Field() position: number
  @Field(type => Snowflake)
  id: string
  @Field(type => Guild)
  guild: Guild
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  calculatedPosition: number
}

export * from './args'

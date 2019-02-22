import { Field, ID, ObjectType } from 'type-graphql'
import { SubFilter } from '@entities/subscription.type'

@ObjectType({ implements: SubFilter })
export class MessageDeleteSub extends SubFilter {
  @Field(type => [ID])
  ids: string[]
}

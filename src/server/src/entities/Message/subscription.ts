import { Field, ID, ObjectType } from 'type-graphql'
import { SubFilter } from '@entities/subscription.type'

import Message from '@entities/Message'

@ObjectType({ implements: SubFilter })
export class MessageSub extends SubFilter {
  @Field(type => Message)
  message: Message
}

@ObjectType({ implements: SubFilter })
export class MessageUpdateSub extends SubFilter {
  @Field(type => Message)
  message: Message
}

@ObjectType({ implements: SubFilter })
export class MessageDeleteSub extends SubFilter {
  @Field(type => [ID])
  ids: string[]
}

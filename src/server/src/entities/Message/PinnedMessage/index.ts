import { ObjectType, Field } from 'type-graphql'
import Message from '@entities/Message'

@ObjectType({ implements: Message })
export class PinnedMessage extends Message {
  @Field() test: string
}

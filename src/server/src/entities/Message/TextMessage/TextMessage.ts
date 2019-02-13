import { ObjectType, Field } from 'type-graphql'
import Message from '@entities/Message'

import { Attachment } from './Attachment'
import { Embed } from './Embed'
import { Reaction } from './Reaction'

@ObjectType({ implements: Message })
export class TextMessage extends Message {
  @Field({ description: 'Message content', nullable: true })
  content?: string

  @Field(type => [Embed], {
    description: 'Message embeds',
    nullable: true
  })
  embeds?: Embed[]

  @Field(type => [Reaction], { description: 'Message reactions' })
  reactions: Reaction[]

  @Field(type => [Attachment], { description: 'Message attachments' })
  attachments: Attachment[]

  // @Field(type => Mentions, { description: 'Message mentions' })
  // mentions: MentionsMessage
}

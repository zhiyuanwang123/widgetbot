import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Bot cache statistics' })
class Stats {
  @Field({ description: 'Total amount of servers the bot is in' })
  totalServers: number

  @Field({
    description: 'Total amount of members across all the servers the bot is in'
  })
  totalMembers: number

  @Field({ description: 'Total amount of guests that have sent messages' })
  totalGuests: number

  @Field({ description: 'Total amount of messages all guests have sent' })
  totalMessages: number

  @Field({ description: 'Total amount of online guests (socket.io count)' })
  onlineGuests: number
}

export default Stats

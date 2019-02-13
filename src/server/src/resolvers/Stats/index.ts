import { store } from 'database'
import Guest from 'database/models/Guest'
import { client } from 'engine'
import {
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Ctx
} from 'type-graphql'
import Stats from '@entities/Stats'

@Resolver(of => Stats)
class StatsResolver implements ResolverInterface<Stats> {
  @Query(returns => Stats)
  stats() {
    return {}
  }

  @FieldResolver()
  totalServers() {
    return client.guilds.size
  }

  @FieldResolver()
  totalMembers() {
    let total = 0
    client.guilds.forEach(guild => (total += guild.memberCount))
    return total
  }

  @FieldResolver()
  async totalGuests() {
    const guests = await store.guests.find({})
    return guests.length
  }

  @FieldResolver()
  async totalMessages() {
    let total = 0
    const guests = await store.guests.find<Guest>({})

    guests.forEach(guest => (total += guest.log.messages.length))
    return total
  }

  @FieldResolver()
  onlineGuests() {
    // TODO: Fix
    return 1 /*(<any>io.engine).clientsCount*/
  }
}

export default StatsResolver

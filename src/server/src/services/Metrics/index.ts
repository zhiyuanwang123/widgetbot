import pmx from 'pmx'
import { Service, Inject } from 'typedi'
import Discord from 'engine'

@Service('metrics')
class Metrics {
  private probe = pmx.probe()

  @Inject(type => Discord)
  private discordService: Discord

  public startProbing() {
    this.probe.metric({
      name: 'Online guests',
      value: () => 1 /*(<any>io.engine).clientsCount*/
    })

    this.probe.metric({
      name: 'Total guilds',
      value: () => this.discordService.client.guilds.size
    })

    this.probe.metric({
      name: 'Total messages',
      async value() {
        let total = 0
        // const guests = await store.guests.find<Guest>({})

        // guests.forEach(guest => (total += guest.log.messages.length))
        return total
      }
    })

    // probe.metric({
    //   name: 'Cached servers',
    //   value: () => cache.store.size
    // })

    // probe.metric({
    //   name: 'Cached channels',
    //   value: () => {
    //     let total = 0
    //     cache.store.forEach(server => (total += server.size))
    //     return total
    //   }
    // })

    // probe.metric({
    //   name: 'Cached messages',
    //   value: () => {
    //     let total = 0
    //     cache.store.forEach(server =>
    //       server.map(channel => (total += channel.size))
    //     )
    //     return total
    //   }
    // })
  }
}

export default Metrics

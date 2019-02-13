import { store } from 'database'
import Guest from 'database/models/Guest'
import { client } from 'engine'

const Context = {
  shard: 'widgetbot.io',

  async accountCount() {
    // TODO
    return 0
    return (await store.guests.find({})).length
  },

  visitorCount() {
    // TODO
    return 1 /*(<any>io.engine).clientsCount*/
  },

  async messageCount() {
    // TODO
    return 0
    const guests = await store.guests.find<Guest>({})

    let count = 0
    guests.forEach(guest => (count += guest.log.messages.length))

    return count
  },

  guildCount() {
    return client.guilds.array().length
  }
}

// Resolves a context object
async function getContext() {
  const context = {} as { [key in keyof typeof Context]: string }

  for (const item of Object.keys(Context)) {
    const value = Context[item]
    context[item] = await (typeof value === 'function' ? value() : value)
  }

  return context
}

export default getContext

import { Message } from '@widgetbot/discord.js'

const format = ([server, count]) =>
  `\`${count}\` [${server}](https://widgetbot.io/channels/${server})`
const join = (servers: [string, number][]) =>
  servers.reduce((prev, server) => `${prev}${format(server)}\n`, '')

const top = (message: Message) => {
  message.reply('', {
    embed: {
      title: `Servers listed by online guest count`,
      description: 'todo'
    }
  })
}

export default top

import config from '@lib/config'

import { IArgs } from '../types'

const isAdmin = (id: string) => config.discord.admins.includes(id)
const context = require.context('./commands', true)

async function Invite({ payload, message }: IArgs) {
  if (!isAdmin(message.author.id))
    return message.reply(
      `Unauthorised! only server admins can use this command`
    )

  if (context.keys().includes(`./${payload}`)) {
    return context(`./${payload}`).default(message)
  }

  message.reply(
    `Unable to locate command! Available commands:` +
      '```json\n' +
      JSON.stringify(context.keys(), null, 2) +
      '```'
  )
}

export default Invite

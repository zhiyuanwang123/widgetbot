import * as Discord from '@widgetbot/discord.js'
import { client } from 'engine'
import Messages from '@utils/messages'

export const getTextChannel = (channelID: Discord.Snowflake) => {
  const channel = client.channels.get(channelID) as Discord.TextChannel

  if (!channel) throw Messages.COULDNT_FIND_CHANNEL(channelID)
  if (channel.type !== 'text')
    throw `Channel #${channel.id} is not a text channel (it's type "${
      channel.type
    }")`

  return channel
}

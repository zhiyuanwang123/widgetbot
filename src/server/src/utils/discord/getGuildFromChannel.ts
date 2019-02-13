import * as Discord from '@widgetbot/discord.js'
import { client } from 'engine'
import Messages from '@utils/messages'

export const getGuildFromChannel = (channelID: Discord.Snowflake) => {
  const channel = client.channels.get(channelID) as Discord.GuildChannel
  if (!channel) throw Messages.COULDNT_FIND_CHANNEL(channelID)
  if (!channel.guild) `Couldn't find guild for channel #${channelID}`

  return channel.guild.id
}

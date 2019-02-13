import * as Discord from '@widgetbot/discord.js'

export const sortByTimestamp = (a: Discord.Message, b: Discord.Message) =>
  a.createdTimestamp === b.createdTimestamp
    ? 0
    : a.createdTimestamp > b.createdTimestamp
      ? 1
      : -1

import * as Discord from '@widgetbot/discord.js'
import { client } from 'engine'

/**
 * Gets a custom global emoji, creating one in the guild if it has permissions
 * else returning a fallback emoji
 */
export async function getOrCreateCustomEmoji(
  channel: Discord.TextChannel,
  [emojiName, emojiId]: [string, Discord.Snowflake],
  fallback = ':white_circle:'
) {
  const { guild } = channel

  // If it exists in the current guild
  let emoji = guild.emojis.find(
    ({ id, name }) => id === emojiId || name === emojiName
  )

  // Else try to create a new one
  if (!emoji) {
    const permissions = channel.permissionsFor(client.user)

    if (permissions.has('MANAGE_EMOJIS'))
      try {
        emoji = await guild.emojis.create(
          `https://cdn.discordapp.com/emojis/${emojiId}.png`,
          emojiName
        )
      } catch (e) {}
  }

  return emoji ? `<:${emoji.identifier}>` : fallback
}

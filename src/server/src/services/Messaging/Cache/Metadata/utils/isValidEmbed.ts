import { MessageEmbed } from '@widgetbot/discord.js'

/**
 * Validates the embed was created by us
 *
 * This is hardcoded to fail when embeds with different formats
 * to our one are passed through
 */
export const isValidEmbed = (embed: MessageEmbed) =>
  embed.type === 'rich' &&
  typeof embed.description === 'string' &&
  !!embed.author &&
  embed.title === undefined &&
  embed.url === undefined &&
  embed.color === undefined &&
  embed.video === undefined &&
  embed.image === null &&
  embed.provider === undefined &&
  embed.files.length === 0 &&
  embed.fields.length === 0

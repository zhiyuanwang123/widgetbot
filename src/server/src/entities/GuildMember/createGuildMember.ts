import * as Discord from '@widgetbot/discord.js'
import GuildMember from '@entities/GuildMember'

export function createGuildMember(member: Discord.GuildMember) {
  const guildMember = new GuildMember()

  guildMember.username = member.user.username
  guildMember.discriminator = member.user.discriminator

  guildMember.displayHexColor = member.displayHexColor
  guildMember.displayName = member.displayName
  guildMember.nickname = member.nickname
  guildMember.joinedAt = member.joinedAt

  return guildMember
}

import * as Discord from '@widgetbot/discord.js'
import { Resolver } from 'type-graphql'
import typify from '@utils/typify'
import { TextEmoji, CustomEmoji } from '@entities/Emoji'

@Resolver()
class EmojiResolver {
  static resolve(emoji: Discord.Emoji) {
    const custom = !!emoji.id
    const resolved = typify(custom ? CustomEmoji : TextEmoji, emoji)

    return resolved
  }
}

export default EmojiResolver

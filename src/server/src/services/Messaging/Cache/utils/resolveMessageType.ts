import typify from '@utils/typify'
import * as Discord from '@widgetbot/discord.js'
import {
  JoinMessage,
  TextMessage,
  PinnedMessage,
  IMessage
} from '@entities/Message'

export const resolveMessageType = (message: Discord.Message): IMessage =>
  typify(
    {
      DEFAULT: TextMessage,
      GUILD_MEMBER_JOIN: JoinMessage,
      PINS_ADD: PinnedMessage
    }[message.type],
    message
  )

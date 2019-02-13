import { Message } from '@widgetbot/discord.js'

export interface IHelp {
  info: string
  args?: (string | string[])[]
  examples?: string[]
}

export interface IArgs {
  message: Message
  payload: string
}

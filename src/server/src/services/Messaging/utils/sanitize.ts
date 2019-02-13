import { Pos } from '@services/Messaging'

/**
 * Escapes keywords by inserting an invisible space at the second position
 * @param message Message to escape
 * @param keywords Keywords to escape
 */
const escape = (message: string, keywords: string[]) => {
  let escaped = message

  for (const keyword of keywords) {
    escaped = escaped
      .split(keyword)
      .join(`${keyword[0]}\u200D${keyword.slice(1)}`)
  }

  return escaped
}

export const sanitize = (message: string) => {
  message = escape(message, [
    Pos.start,
    Pos.end,
    '@everyone',
    '@here',
    '](http'
  ])

  return message
}

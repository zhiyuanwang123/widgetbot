import { Pos } from '@services/Messaging'

/**
 * Escapes keywords by inserting an invisible space at the second position
 * @param message Message to escape
 * @param keywords Keywords to escape
 */
const Escape = (message: string, keywords: string[]) => {
  let escaped = message
  keywords.forEach(
    keyword =>
      (escaped = escaped
        .split(keyword)
        .join(`${keyword[0]}\u200D${keyword.slice(1)}`))
  )
  return escaped
}

const sanitize = (message: string) => {
  message = Escape(message, [
    Pos.start,
    Pos.end,
    '@everyone',
    '@here',
    '](http'
  ])

  return message
}

export default sanitize

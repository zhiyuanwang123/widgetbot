export const OPEN_PROFILE_EMOTE_NAME = 'open_profile'
export const OPEN_PROFILE_EMOTE_ID = '493459478226796544'
export const OPEN_PROFILE_FALLBACK = ':speech_balloon:'
export const OPEN_PROFILE_EMOTE = `<:${OPEN_PROFILE_EMOTE_NAME}:${OPEN_PROFILE_EMOTE_ID}>`

export const profileLinkRegex = new RegExp(
  ` \\[(?:${OPEN_PROFILE_FALLBACK}|<:${OPEN_PROFILE_EMOTE_NAME}:\\d+>)\\]\\(([^\\)]+)\\)$(?!\\n)`
)

export const getProfileLink = (guest: string) =>
  `https://widgetbot.io/profile/${guest}`

export const getProfileClickable = (
  guest: string,
  emoji = OPEN_PROFILE_EMOTE
) => `[${emoji}](${getProfileLink(guest)})`

export const appendProfileLink = (
  content: string,
  guest: string,
  emoji = OPEN_PROFILE_EMOTE
) => `${content} ${getProfileClickable(guest, emoji)}`

export const extractProfileLink = (injectedContent: string) => {
  const match = injectedContent.match(profileLinkRegex)
  if (!match) return null

  const { 1: url, index } = match
  const trimmedContent = injectedContent.slice(0, index)

  return { url, trimmedContent }
}

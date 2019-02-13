export const OPEN_PROFILE_EMOTE_NAME = 'open_profile'
export const OPEN_PROFILE_EMOTE_ID = '493459478226796544'
export const OPEN_PROFILE_FALLBACK = ':speech_balloon:'
export const OPEN_PROFILE_EMOTE = `<:${OPEN_PROFILE_EMOTE_NAME}:${OPEN_PROFILE_EMOTE_ID}>`

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

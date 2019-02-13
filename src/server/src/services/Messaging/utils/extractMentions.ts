export const extractMentions = (content: string) => {
  const regex = /<@(?:&)?([^>])+>/g
  let mentions = ''

  let match
  while ((match = regex.exec(content))) {
    const [mention, id] = match
    mentions += ` ${mention}`
  }

  return mentions
}

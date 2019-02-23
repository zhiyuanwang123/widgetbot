// This is made to match Prisma.io's ID's
const EXTRACT_ID_REGEX = /^\/profile\/([a-z0-9]+)$/

export const extractIdFromUrl = (url: URL) => {
  const match = url.pathname.match(EXTRACT_ID_REGEX)
  if (!match) return null

  return match[1]
}

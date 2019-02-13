import { createError } from 'apollo-errors'
import Messages from 'engine/messages'

export const MemberNotInServer = createError('MemberNotInServer', {
  message: Messages.BAD_MEMBER
})

export const BadChannel = createError('BadChannel', {
  message: Messages.BAD_CHANNEL
})

export const BadServer = createError('BadServer', {
  message: Messages.BAD_SERVER
})

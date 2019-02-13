import { store } from 'database'
import GuestMessage from 'database/models/GuestMessage'

/**
 * Inserts a message with enhanced detail into the store
 * @param message The message enhancer data
 */
export async function SetEnhancer(enhancer: GuestMessage, content: string) {
  await store.guests.update(
    { 'user.id': enhancer.user.id },
    {
      $push: {
        'log.messages': enhancer.id
      }
    }
  )
}

// Debugging
;(global as any).guestMessage = { SetEnhancer }

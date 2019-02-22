import produce from 'immer'
import MESSAGES from './Messages.graphql'
import NEW_MESSAGES from './NewMessages.graphql'
import UPDATED_MESSAGES from './UpdatedMessages.graphql'
import DELETED_MESSAGES from './DeletedMessages.graphql'
import { useQuery } from 'react-apollo-hooks'
import { useEffect } from 'react'

export const useMessages = (channel: string) => {
  const query = useQuery(MESSAGES, {
    variables: { channel },
    fetchPolicy: 'cache-and-network'
  })

  const ready =
    !query.loading ||
    (query.data && query.data.channel && query.data.channel.id === channel) ||
    false

  const messages = ready ? query.data.channel.messages : []

  async function fetchMore(options?: {
    around?: string
    after?: string
    before?: string
    limit?: number
  }) {
    if (!options) {
      const [firstMessage] = messages
      if (!firstMessage) return

      options = { before: firstMessage.id }
    }

    await query.fetchMore({
      query: MESSAGES,
      variables: { channel, ...options },
      updateQuery: (prev, { fetchMoreResult }) =>
        produce(prev, draftState => {
          draftState.channel.messages = [
            ...fetchMoreResult.channel.messages,
            ...draftState.channel.messages
          ]
        })
    })
  }

  useEffect(
    () =>
      query.subscribeToMore({
        document: NEW_MESSAGES,
        variables: { channel },
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, ({ channel }) => {
            channel.messages = [
              ...channel.messages,
              subscriptionData.data.message
            ]
          })
      }),
    [channel]
  )

  useEffect(
    () =>
      query.subscribeToMore({
        document: UPDATED_MESSAGES,
        variables: { channel },
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, ({ channel: { messages } }) => {
            const message = subscriptionData.data.messageUpdate
            const index = messages.findIndex(m => m.id === message.id)

            if (index > -1) {
              messages[index] = message
            }
          })
      }),
    [channel]
  )

  useEffect(
    () =>
      query.subscribeToMore({
        document: DELETED_MESSAGES,
        variables: { channel },
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, ({ channel }) => {
            const deletedMessages = subscriptionData.data.messageDelete

            channel.messages = channel.messages.filter(
              message => !deletedMessages.find(m => m.id === message.id)
            )
          })
      }),
    [channel]
  )

  return { ready, messages, fetchMore, error: query.error }
}

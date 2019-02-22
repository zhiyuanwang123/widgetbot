import * as React from 'react'

import { Field, Root } from './elements'
import Input from './Input'
import { withI18n, withI18nProps } from '@lingui/react'
import { Query } from 'react-apollo'
import { ChannelName, ChannelNameVariables } from '@generated'
import GET_CHANNEL_NAME from './ChannelName.graphql'
import SEND_MESSAGE from './SendMessage.graphql'
import { Route, matchPath } from 'react-router-dom'
import autobind from 'autobind-decorator'
import client from '@lib/apollo'
import { history } from '@lib/history'
import { string } from 'mobx-state-tree/dist/internal'
import { MESSAGES } from '@hooks'

@autobind
class Chat extends React.PureComponent<withI18nProps> {
  state = {
    rows: 1
  }

  private input: HTMLTextAreaElement

  onChange(value: string) {
    const rows = value.split(/\r\n|\r|\n/).length
    this.setState({ rows })
    this.typing()
  }

  async onSubmit(content: string) {
    if (content.length === 0) return

    const {
      params: { channel }
    } = matchPath<{ guild: string; channel: string }>(
      history.location.pathname,
      {
        path: '/:guild/:channel'
      }
    )

    // TODO: Clear the input field only when the user is signed in.
    this.input.value = ''
    await client.mutate<any>({
      mutation: SEND_MESSAGE,
      variables: {
        channel,
        content
      },
      optimisticResponse: {
        __typename: 'Mutation',
        sendMessage: {
          __typename: 'TextMessage',
          id: Math.random(),
          createdAt: +new Date(),
          editedAt: null,
          content,
          // TODO: Get the guests info to provide the proper optimistic response
          author: {
            id: '',
            username: '',
            discriminator: '0000',
            avatarURL: null,
            __typename: 'GuestMember'
          },
          reactions: [],
          attachments: [],
          embeds: []
        }
      },
      update: (proxy, { data: { sendMessage } }) => {
        const data = proxy.readQuery<any>({
          query: MESSAGES,
          variables: { channel }
        })
        data.channel.messages.push(sendMessage)
        proxy.writeQuery({ query: MESSAGES, variables: { channel }, data })
      }
    })
  }

  isTyping(typing: boolean) {
    // TODO: FIX
    // const { activeChannel, clientTyping } = this.props
    // clientTyping({ channel: activeChannel, typing })
  }

  render() {
    const { i18n } = this.props

    return (
      <Root className="chat">
        <Field rows={this.state.rows} className="field">
          <Route path="/:guild/:channel?">
            {({
              match: {
                params: { channel }
              }
            }) => (
              <Query<ChannelName, ChannelNameVariables>
                query={GET_CHANNEL_NAME}
                variables={{ channel }}
              >
                {({ data }) => {
                  const channel = data && data.channel && data.channel.name

                  return (
                    <Input
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                      innerRef={ref => (this.input = ref)}
                      innerProps={{
                        placeholder: channel
                          ? i18n.t`Message #${channel}`
                          : null
                      }}
                    />
                  )
                }}
              </Query>
            )}
          </Route>
          {/* <Emoji /> */}
        </Field>
      </Root>
    )
  }

  monitor = {
    last: null,
    timer: null
  }

  typing() {
    // Typing timeout threshold
    const threshold = 1000

    const now = +new Date()
    const { monitor } = this

    // Clear the previous stopped-typing timer
    clearTimeout(this.monitor.timer)

    // If they don't register a keypress within the threshold
    // then they've stopped typing
    this.monitor.timer = setTimeout(() => {
      this.isTyping(false)
      this.monitor.last = null
    }, threshold)

    // If the threshold time has passed, then send another
    // keypress event to the server
    if (now - monitor.last > threshold) {
      this.isTyping(true)
      monitor.last = now
    }
  }
}

export default withI18n()(Chat)

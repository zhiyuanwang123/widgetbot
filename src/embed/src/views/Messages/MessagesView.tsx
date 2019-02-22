import * as React from 'react'
import Wrapper from '@ui/Wrapper'
import Header from './Header'
import { RouteComponentProps } from 'react-router-dom'
import Chat from '@ui/Chat'
import { Messages } from './Messages'

type MessageProps = RouteComponentProps<{
  guild: string
  channel: string
}>

export const MessagesView = ({ match }: MessageProps) => {
  return (
    <Wrapper>
      <Header channel={match.params.channel} />
      <Messages guild={match.params.guild} channel={match.params.channel} />
      <Chat />
    </Wrapper>
  )
}

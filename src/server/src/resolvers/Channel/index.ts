import * as Discord from '@widgetbot/discord.js'
import { client } from 'engine'
import { Args, Query, Resolver } from 'type-graphql'
import Channel, { ChannelArgs } from '@entities/Channel'

import typify from '@utils/typify'
import TextChannel from '@entities/TextChannel'
import CategoryChannel from '@entities/CategoryChannel'
import VoiceChannel from '@entities/VoiceChannel'

@Resolver(of => Channel)
export class ChannelResolver /*implements ResolverInterface<Channel>*/ {
  static resolve(channel: Discord.Channel) {
    const resolved = typify(
      {
        text: TextChannel,
        category: CategoryChannel,
        voice: VoiceChannel
      }[channel.type],
      channel
    )

    if (resolved.parent) {
      const parent = typify(CategoryChannel, resolved.parent)
      resolved.parent = parent
    }

    return resolved
  }

  @Query(type => Channel, { nullable: true })
  channel(@Args() { id }: ChannelArgs) {
    const channel = client.channels.get(id)
    if (!channel) return null

    return ChannelResolver.resolve(channel)
  }
}

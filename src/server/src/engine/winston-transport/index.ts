import is from '@sindresorhus/is'
import { Util, TextChannel } from '@widgetbot/discord.js'
import config from '@lib/config'

import yaml from 'js-yaml'
import * as R from 'ramda'
import * as winston from 'winston'

import Config from '@entities/Config'
import { Service } from 'typedi'
import Discord from 'engine'

type Event = keyof Config['discord']['events']

enum Colors {
  error = 16721408,
  warn = 16762368,
  info = 55610,
  verbose = 16723056,
  debug = 50631,
  silly = 14383124
}

const capitalize = ([s, ...r]) => s.toUpperCase() + r.join('')

@Service('discord.transport')
class DiscordTransport extends winston.Transport {
  discordService: Discord

  async log(level: string, message, meta, callback) {
    try {
      const { discord, embed } = meta

      delete meta.discord
      delete meta.embed

      const channel = await this.fetchChannelFromEvent(discord)

      const metadata = R.omit(['from'], meta)
      const yml = Object.keys(metadata).length
        ? '```yaml\n' +
          Util.escapeMarkdown(yaml.safeDump(metadata), true) +
          '```'
        : ''

      const customEmbed = is.function_(embed) ? embed(meta) : embed

      channel.send('', {
        embed: customEmbed || {
          title: `[${level.toUpperCase()}] ${meta.from || ''}`,
          color: Colors[level],
          description: capitalize(message) + yml
        }
      })
    } catch (e) {}

    callback(null, true)
  }

  private fetchChannelFromEvent(event: Event) {
    if (!event) throw false
    const configuredChannel = config.discord.events[event]
    if (!event) throw 'Unknown event'

    const [server, channel] = configuredChannel
    return this.discordService.client.channels.get(channel) as TextChannel
  }
}

export default DiscordTransport

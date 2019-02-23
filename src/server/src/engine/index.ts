import App from '@app'
import logger, { Meta } from '@lib/logger'
import { DiscordStatus } from '@services/Discord'
import { Client } from '@widgetbot/discord.js'
import async from 'doasync'
import Commands from 'engine/commands'
import options from 'engine/options'
import startup from 'engine/winston-transport/startup'
import { Inject, Service } from 'typedi'

import * as Topics from '../resolvers/subscriptions'
import Guests from './guests'

export const client = new Client(options)

export const guests = new Guests()

const meta = Meta('Discord')

@Service('discord')
export default class Discord {
  @Inject(type => DiscordStatus)
  private discordStatus: DiscordStatus

  @Inject(type => App)
  private appService: App

  public client = client

  public async login(token: string) {
    logger.info(`⌛ contacting Discord API...`, meta())
    logger.profile('discord-login')

    this.client.login(token)
    await async(client).on('ready')

    this.discordStatus.startAutoplay()
    this.attachListeners()

    logger.profile('discord-login', `✅ authenticated!`, {
      ...meta(),
      discord: 'status',
      embed: startup,
      username: this.client.user.tag,
      id: this.client.user.id
    })
  }

  private attachListeners() {
    /**
     * Message events
     */
    this.client.on('message', message => {
      // Command engine
      if (message.mentions.users.has(this.client.user.id)) Commands(message)

      this.appService.pubsub.publish(Topics.MESSAGE, message)
    })

    /**
     * Message edit events
     */
    this.client.on('messageUpdate', (_, message) => {
      this.appService.pubsub.publish(Topics.MESSAGE_UPDATE, message)
    })

    /**
     * Message delete events
     */
    this.client.on('messageDelete', message => {
      this.appService.pubsub.publish(Topics.MESSAGE_DELETE, [message])
    })

    this.client.on('messageDeleteBulk', messages => {
      this.appService.pubsub.publish(Topics.MESSAGE_DELETE, messages)
    })

    /**
     * Message reaction events
     */
    this.client.on('messageReactionAdd', reaction => {
      const { message } = reaction

      this.appService.pubsub.publish(Topics.REACTION_ADD, {
        guild: message.guild.id,
        channel: message.channel.id,
        reaction
      })
    })

    this.client.on('messageReactionRemove', reaction => {
      const { message } = reaction

      this.appService.pubsub.publish(Topics.REACTION_REMOVE, {
        guild: message.guild.id,
        channel: message.channel.id,
        reaction
      })
    })

    /**
     * Join events
     */
    this.client.on('guildCreate', guild => {
      logger.info(`Joined server`, {
        ...meta('join'),
        discord: 'logs',
        name: guild.name,
        memberCount: guild.memberCount,
        id: guild.id
      })
    })

    this.client.on('guildDelete', guild => {
      logger.info(`Left server`, {
        ...meta('kick'),
        discord: 'logs',
        name: guild.name,
        memberCount: guild.memberCount,
        id: guild.id
      })
    })
  }
}

// Debugging
;(<any>global).client = client
;(<any>global).guests = guests

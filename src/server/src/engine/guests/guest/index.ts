import 'database/guest'

import config from '@lib/config'
import * as Discord from '@widgetbot/discord.js'
import Permissions from 'engine/permissions'
import fetchChannel from 'engine/util/fetchChannel'
import logger from '@lib/logger'
import raven from 'raven'

import sanitize from 'engine/guests/guest/sanitize'
import { Login } from 'database/guest'
import { UserType } from '@entities/User'
import { Metadata } from '@services/Messaging'
import { Inject } from 'typedi'

interface IGuest {
  server: string
  token: string
}

class Guest {
  @Inject() private metadataService: Metadata

  public token: string
  public server: string

  public name: string
  public avatar: string
  public id: string
  public type: UserType = 'guest'

  public messages = [] as Discord.Message[]

  private metadata: string

  constructor({ server, token }: IGuest) {
    this.server = server
    this.token = token
  }

  /**
   * Hydrates the Guest instance with data from the database
   */
  async login(data: { ip: string }) {
    const { user } = await Login({ ...data, token: this.token })

    this.name = user.name
    this.avatar = user.avatar
    this.id = user.id

    // TODO :Fix
    // @ts-ignore
    this.metadata = this.metadataService.serialize({
      type: this.type,
      ...user
    })
  }

  cacheMessage(message: Discord.Message) {
    if (message instanceof Array) {
      const error = new Error(`Message shouldn't be an array`)
      raven.captureException(error)
      throw error
    }

    return this.messages.push(message)
  }

  async sendMessage(channelID: string, unsanitized: string) {
    const req = {
      server: this.server,
      channel: channelID
    }

    const { channel, permissions } = await fetchChannel(req)
    const guestPermissions = await Permissions(req)

    // Disallow guests without permission from sending messages
    if (!guestPermissions.SEND_MESSAGES) {
      throw `You don't have permission to send messages on this channel`
    }

    // Sanitize the message - @everyone, @here etc.
    const message = sanitize(unsanitized) + this.metadata

    if (!permissions.has('MANAGE_WEBHOOKS')) {
      return await this.sendMessageAsSelf(channel, message)
    }

    const webhooks = await channel.fetchWebhooks()
    const webhook = webhooks.find(({ name }) => name === config.discord.webhook)

    if (webhook) {
      return await this.sendMessageAsWebhook(channel, webhook, message)
    }

    try {
      const newWebhook = await channel.createWebhook(config.discord.webhook, {
        reason: 'Allows WidgetBot users to write messages to this channel'
      })
      return await this.sendMessageAsWebhook(channel, newWebhook, message)
    } catch (error) {
      logger.log('debug', error.toString())
      return await this.sendMessageAsSelf(channel, message)
    }
  }

  // Webhook sending failed, will try sending as self
  async sendMessageAsSelf(channel: Discord.TextChannel, message: string) {
    const content = `\`${this.name}\` ${message}`

    const newMessage = (await channel.send(content)) as Discord.Message
    this.cacheMessage(newMessage)
    return newMessage
  }

  async sendMessageAsWebhook(
    channel: Discord.TextChannel,
    webhook: Discord.Webhook,
    message: string
  ) {
    try {
      const newMessage = (await webhook.send(message, {
        username: this.name,
        avatarURL: this.avatar
      })) as Discord.Message

      this.cacheMessage(newMessage)

      return newMessage
    } catch (error) {
      logger.log('debug', error.toString())
      return await this.sendMessageAsSelf(channel, message)
    }
  }

  private typingTimeout
  async startTyping(channelID: string) {
    try {
      const { channel } = await fetchChannel(
        { server: this.server, channel: channelID },
        'SEND_MESSAGES'
      )

      channel.startTyping()

      // Auto-stop typing after 2 seconds
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => channel.stopTyping(), 2000)
    } catch (e) {
      // Bad perms
    }
  }

  async stopTyping(channelID: string) {
    try {
      const { channel } = await fetchChannel(
        { server: this.server, channel: channelID },
        'SEND_MESSAGES'
      )
      channel.stopTyping()

      // Clear typing timeout
      clearTimeout(this.typingTimeout)
    } catch (e) {
      // Bad perms
    }
  }
}

export default Guest

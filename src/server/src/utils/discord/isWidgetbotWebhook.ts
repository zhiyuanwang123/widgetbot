import * as Discord from '@widgetbot/discord.js'
import memoize from 'memoizee'
import { client } from 'engine'
import { WEBHOOK_NAME } from './getWebhook'

export const isWidgetbotWebhook = ({ name }: Discord.Webhook) =>
  name.toLowerCase().includes(WEBHOOK_NAME.toLowerCase())

export const isWidgetbotWebhookFromId = memoize(
  async (webhookId: Discord.Snowflake) => {
    try {
      const webhook = await client.fetchWebhook(webhookId)

      return isWidgetbotWebhook(webhook)
    } catch (e) {
      return false
    }
  }
)

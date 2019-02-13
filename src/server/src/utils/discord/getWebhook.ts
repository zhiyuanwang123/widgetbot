import * as Discord from '@widgetbot/discord.js'
import { isWidgetbotWebhook } from './isWidgetbotWebhook'

export const WEBHOOK_NAME = 'WidgetBot'

export async function getWebhook(channel: Discord.TextChannel) {
  const webhooks = await channel.fetchWebhooks()

  // Use existing webhook
  let webhook = webhooks.find(isWidgetbotWebhook)

  // Create a new webhook
  if (!webhook) webhook = await channel.createWebhook(WEBHOOK_NAME)

  return webhook
}

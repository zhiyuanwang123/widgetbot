import * as Discord from '@widgetbot/discord.js'
import is from '@sindresorhus/is'
import { Service } from 'typedi'

import { IMetadata, IMetadataStorage } from './types'
import { Pos, unseen } from './unseen-data'
import { isValidEmbed, extractProfileLink, extractIdFromUrl } from './utils'
import { isWidgetbotWebhookFromId } from '@utils'

@Service('messaging.metadata')
export class Metadata {
  /**
   * Serializes metadata into zero-width binary
   * @deprecated
   */
  public serialize(meta: IMetadata) {
    const storage: IMetadataStorage = [
      meta.name,
      meta.id,
      meta.type,
      meta.avatar
    ]

    return Pos.start + unseen.encode(storage) + Pos.end
  }

  /**
   * Deserializes the metadata from a message
   */
  // public deserialize(message: string) {
  //   try {
  //     var [content] = message.split(Pos.start)

  //     const start = message.indexOf(Pos.start)
  //     const end = message.lastIndexOf(Pos.end)
  //     if (start === -1 || end === -1) throw false

  //     const data = message.substring(start + Pos.start.length, end)

  //     var [name, id, type, avatar]: IMetadataStorage = unseen.decode(data)
  //   } catch (e) {
  //     return { meta: {}, content }
  //   }

  //   const meta: IMetadata = {
  //     ...(['guest', 'member'].includes(type) && { type }),
  //     ...(is.string(name) && { name }),
  //     ...(is.string(id) && { id }),
  //     ...(is.string(avatar) && { avatar })
  //   }

  //   return { meta, content }
  // }

  /**
   * Extracts the profile URL
   */
  public async extract(message: Discord.Message) {
    // Attempt to extract from embeds
    const searchEmbeds = message.author.bot

    if (searchEmbeds)
      for (const embedIndex in message.embeds) {
        const embed = message.embeds[+embedIndex]
        if (!embed || !isValidEmbed(embed)) continue

        const extraction = this.createExtraction(
          embed.description,
          // Remove the embed with their message in
          message.embeds.filter((e, i) => i !== +embedIndex),
          embed.author.name,
          embed.author.url
        )

        if (extraction) return extraction
      }

    const searchContent =
      !!message.content &&
      message.author.bot && // Only search messages from bots
      (await isWidgetbotWebhookFromId(message.webhookID)) // Make sure it's our webhook

    // Attempt to extract from webhook's content
    if (searchContent) {
      const linkExtraction = extractProfileLink(message.content)

      if (linkExtraction) {
        const extraction = this.createExtraction(
          linkExtraction.trimmedContent,
          message.embeds,
          message.author.username,
          linkExtraction.url
        )

        if (extraction) return extraction
      }
    }

    return null
  }

  private createExtraction(
    cleanedContent: string,
    filteredEmbeds: Discord.MessageEmbed[],
    authorName: string,
    profileUri: string
  ) {
    if (!is.string(cleanedContent)) return null // Messages need content
    if (!is.string(authorName)) return null
    if (!is.string(profileUri)) return null

    const profileUrl = new URL(profileUri)

    // @TODO: [Optimization] Ensure the profileUrl domain is the same as the currently running server
    const profileId = extractIdFromUrl(profileUrl)

    const extraction = {
      cleanedContent,
      filteredEmbeds,
      authorName,
      profileUrl,
      profileId
    }

    // TODO: Validate url is correct
    return extraction
  }
}

export * from './unseen-data'
export * from './types'

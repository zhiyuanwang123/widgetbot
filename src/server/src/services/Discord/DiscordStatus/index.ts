import config from '@lib/config'
import getContext from './context'
import template from './template'
import autobind from 'autobind-decorator'
import { client } from 'engine'
import { Service } from 'typedi'

const DEFAULT_INTERVAL = 60 * 1000

@Service('discord.status')
@autobind
export class DiscordStatus {
  private timer
  private position = -1

  public startAutoplay(every = DEFAULT_INTERVAL) {
    this.stopAutoplay()
    this.next()
    this.timer = setInterval(this.next, every)
  }

  public stopAutoplay() {
    clearInterval(this.timer)
  }

  /**
   * Toggles the playing status to the next iteration
   */
  public async next() {
    const { statuses } = config.discord

    if (!(statuses && statuses.length)) return

    this.position++
    if (this.position === statuses.length) this.position = 0

    const context = await getContext()
    const status = template(statuses[this.position], context)

    client.user.setPresence({ activity: { name: status } })
  }
}

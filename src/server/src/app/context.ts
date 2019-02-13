import Container from 'typedi'
import ProfilesService from '@services/Profiles'
import autobind from 'autobind-decorator'
import { Snowflake } from '@widgetbot/discord.js'
import WebSocket from 'ws'

export class User {
  private profilesService = Container.get(ProfilesService)

  constructor(public id: Snowflake, public ip: string) {}

  public async getProfile() {
    const profile = await this.profilesService.get(this.id)
    return profile
  }
}

@autobind
export class Context {
  constructor(
    public session: Session,
    public req: Req,
    public ws?: WebSocket
  ) {}

  public get user() {
    const { profileID } = this.session
    const user = new User(profileID, this.ip)

    return user
  }

  public get ip() {
    const realIP = this.req.headers['x-real-ip'] as string
    const address = this.req.connection.remoteAddress

    return realIP || address
  }
}

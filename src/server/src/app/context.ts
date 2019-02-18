import autobind from 'autobind-decorator'
import { Snowflake } from '@widgetbot/discord.js'
import WebSocket from 'ws'

export class User {
  constructor(public profileId: Snowflake, public ip: string) {}
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

export interface Session {
  profileID?: string
}

export type Req = import('http').IncomingMessage & { session: Session }

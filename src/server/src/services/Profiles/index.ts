import { Service, Inject } from 'typedi'
import { Snowflake, User } from '@widgetbot/discord.js'
import DatabaseService from '@services/Database'

@Service('profiles')
class ProfilesService {
  @Inject(type => DatabaseService)
  private databaseService: DatabaseService

  public async get(id: string) {
    return await this.databaseService.connection.profile({ id })
  }

  public async getDiscordUser(id: string): Promise<User> {
    // @TODO: implement
    return null
  }

  public async create(username = 'Guest') {
    return await this.databaseService.connection.createProfile({
      username
    })
  }

  public async changeUsername(id: Snowflake, username: string) {
    return await this.databaseService.connection.updateProfile({
      where: { id },
      data: { username }
    })
  }
}

export default ProfilesService

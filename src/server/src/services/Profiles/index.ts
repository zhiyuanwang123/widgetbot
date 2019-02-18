import { Service, Inject } from 'typedi'
import { Snowflake } from '@widgetbot/discord.js'
import DatabaseService from '@services/Database'

@Service('profiles')
class ProfilesService {
  @Inject(type => DatabaseService)
  public databaseService: DatabaseService

  public async get(id: string) {
    return await this.databaseService.connection.profile({ id })
  }

  public async getGuestProfile(guestId: string) {
    return await this.databaseService.connection
      .guildGuest({ id: guestId })
      .profile()
  }

  public async create(username = 'Guest') {
    return await this.databaseService.connection.createProfile({
      username
    })
  }

  public async changeUsername(id: Snowflake, username: string) {
    return await this.databaseService.connection.updateProfile({
      data: { username },
      where: { id }
    })
  }
}

export default ProfilesService

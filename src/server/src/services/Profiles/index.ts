import { Service, Inject } from 'typedi'
import { getRepository, DocResult } from '@services/Database'
import Profile from '@entities/Profile'
import { Snowflake } from '@widgetbot/discord.js'

@Service('profiles')
class ProfilesService {
  private profileRepo = getRepository(Profile)

  public async get(id: string) {
    if (!id) return null
    const profile = await this.profileRepo.findById(id)
    return profile
  }

  public async create(username = 'Guest') {
    const profile = await this.profileRepo.create({
      username,
      connections: []
    })

    return profile
  }

  public async setUsername(id: Snowflake, username: string) {
    await this.profileRepo.findByIdAndUpdate(id, { $set: { username } })
  }
}

export default ProfilesService

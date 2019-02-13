import logger, { Meta } from '@lib/logger'
import mongoose from 'mongoose'
import { Service } from 'typedi'

import { getRepository } from './getRepository'

export * from 'typegoose'
export * from './getRepository'
export * from './decorators'

@Service('database')
export default class Database {
  private meta = Meta('Database')

  public getRepository = getRepository
  public mongoose = mongoose

  public async createConnection() {
    logger.profile('db-connect')
    logger.info(`⌛ connecting to MongoDB...`, this.meta())

    await mongoose.connect(
      'mongodb://samdd:samddsamdd11@ds161411.mlab.com:61411/widgetbot'
    )

    if (['debug', 'verbose', 'silly'].includes(logger.level)) {
      mongoose.set('debug', true)
    }

    logger.profile('db-connect', `✅ connected!`, this.meta())
  }
}

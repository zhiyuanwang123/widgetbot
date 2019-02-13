import { Prisma } from '@widgetbot/database'
import logger, { Meta } from '@lib/logger'
import { Service } from 'typedi'

@Service('database')
export default class DatabaseService {
  public connection = new Prisma({
    endpoint: 'https://eu1.prisma.sh/sam-denty-1336dd/widgetbot/dev'
  })
}

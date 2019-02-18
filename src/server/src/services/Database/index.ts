import { Prisma } from '@widgetbot/database'
import { Service } from 'typedi'
import { isSilly } from '@lib/config'

@Service('database')
export default class DatabaseService {
  public connection = new Prisma({
    endpoint: 'https://eu1.prisma.sh/sam-denty-1336dd/widgetbot/dev',
    debug: isSilly
  })
}

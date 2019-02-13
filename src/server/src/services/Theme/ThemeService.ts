import { Service, Inject } from 'typedi'
import DatabaseService from '@services/Database'
import { ThemeColorsUpdateDataInput } from '@widgetbot/database'

@Service('theme')
export class ThemeService {
  @Inject(type => DatabaseService)
  public databaseService: DatabaseService

  public async get(id: string) {
    const [theme] = await this.databaseService.connection.themes({
      where: { id }
    })

    return theme
  }

  public async updateColors(id: string, colors: ThemeColorsUpdateDataInput) {
    return await this.databaseService.connection.updateTheme({
      where: { id },
      data: {
        colors: {
          update: colors
        }
      }
    })
  }

  public async updateCSS(id: string, css: string) {
    return await this.databaseService.connection.updateTheme({
      where: { id },
      data: { css }
    })
  }

  public async createTheme() {
    return await this.databaseService.connection.createTheme({
      colors: { create: {} }
    })
  }
}

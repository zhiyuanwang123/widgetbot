import { Resolver, FieldResolver, Root, ResolverInterface } from 'type-graphql'

import Theme from '@entities/Theme'
import { Inject } from 'typedi'
import { ThemeService } from '@services/Theme'

@Resolver(of => Theme)
export class ThemeResolver implements ResolverInterface<Theme> {
  @Inject() private themeService: ThemeService

  @FieldResolver()
  async colors(@Root() theme) {
    return theme.colors || (await this.themeService.getColors(theme.id))
  }
}

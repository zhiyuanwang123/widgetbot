# [WidgetBot](https://widgetbot.io) ![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg) [![](https://data.jsdelivr.com/v1/package/npm/@widgetbot/crate/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@widgetbot/crate) [![](https://data.jsdelivr.com/v1/package/npm/@widgetbot/html-embed/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@widgetbot/html-embed)

> Discord chat widgets for your website

[![Banner](./.github/banner.png)](https://widgetbot.io)

| @widgetbot/                                                    | Description                         |                                                      |                                                  |
| -------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| [embed](https://widgetbot.io)                                  | ReactJS widget client               | [Docs](https://docs.widgetbot.io/embed/)             | [/packages/embed/](/packages/embed/)             |
| [crate](http://npmjs.com/package/@widgetbot/crate)             | JS library that provides popup chat | [Docs](https://docs.widgetbot.io/embed/crate/)       | [/packages/crate/](/packages/crate/)             |
| [react-embed](http://npmjs.com/package/@widgetbot/react-embed) | React component for the embed       | [Docs](https://docs.widgetbot.io/embed/react-embed/) | [/packages/react-embed/](/packages/react-embed/) |
| [html-embed](http://npmjs.com/package/@widgetbot/html-embed)   | HTML element for the embed          | [Docs](https://docs.widgetbot.io/embed/html-embed/)  | [/packages/html-embed/](/packages/html-embed/)   |
| [embed-api](http://npmjs.com/package/@widgetbot/embed-api)     | Embed GraphQL JS API                | [Docs](https://docs.widgetbot.io/embed/embed-api/)   | [/packages/embed-api/](/packages/embed-api/)     |

## Getting started

**Requirements:**

- Node.js 10+
- Yarn

### Building sources

```bash
git clone https://github.com/widgetbot-io/widgetbot.git
cd widgetbot

# Install dependencies
yarn

# Build the server
pushd src/server
yarn build
popd

# Build the embed
pushd src/embed
yarn build
popd
```

## Development

This project is structured in a monorepo format, using [lerna](https://lernajs.io).

### Tooling

All communication between the server & embed is performed over [GraphQL](https://graphql.com).

**Database**

[Prisma](https://www.prisma.io) provides a GraphQL API to query data from the database, and an auto-generated type-safe client.

**Services**

The server uses services and dependency injection, with [type-di](https://www.npmjs.com/package/typedi). Services can be found in `/src/server/src/services`

**GraphQL**

The GraphQL server uses [type-graphql](https://github.com/19majkel94/type-graphql) to describe the GraphQL API and resolve it. The models can be found in `/src/server/src/entities`, and the resolvers in `/src/server/src/resolvers`

### Folder structure

```bash
 - packages # This folder contains modules that are used internally, and also
               # published to NPM.

 - src      # This folder contains sources for stuff that it doesn't make sense
            # to publish on NPM. eg. the server & embed
```

```bash
git clone https://github.com/widgetbot-io/widgetbot.git
cd widgetbot

# Install dependencies
yarn

# Build the server
pushd src/server
yarn build
popd

# Build the embed
pushd src/embed
yarn build
popd
```

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/13242392?v=4" width="100px;"/><br /><sub><b>Sam Denty</b></sub>](https://samdd.me)<br />[🐛](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/issues?q=author%3Asamdenty99 "Bug reports") [💻](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/commits?author=samdenty99 "Code") [🎨](#design-samdenty99 "Design") [📖](https://github.com/widgetbot-io/widgetbot/widgetbot-io/WidgetBot/commits?author=samdenty99 "Documentation") [💡](#example-samdenty99 "Examples") [🚇](#infra-samdenty99 "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-samdenty99 "Reviewed Pull Requests") [🔧](#tool-samdenty99 "Tools") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

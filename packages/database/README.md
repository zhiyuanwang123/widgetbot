# What is this module

This module contains the necessary files to configure, deploy and connect to a [Prisma database](https://www.prisma.io).

Prisma is a Database ORM that provides a GraphQL API to access the database. See an example over at https://eu1.prisma.sh/sam-denty-1336dd/widgetbot/dev.

# Getting started

It runs with MongoDB, SQL or PostGres, and can either be hosted for free in the cloud - or a self-managed docker instance.

## Prisma cloud SAAS

1.  Remove the `endpoint` line from `prisma.yml`
2.  Run the following
    ```bash
    yarn workspace @widgetbot/database deploy
    # The CLI will walk you through the process
    yarn workspace @widgetbot/database build
    ```

## Self-hosted docker

TODO: add documentation

# Module usage

```typescript
import { Prisma } from '@widgetbot/database'

const database = new Prisma({
  endpoint: 'PRISMA_SERVER_URL',
  secret: 'secret'
})
```

# Commands

```bash
# Resets the database and seeds with mock data
yarn workspace @widgetbot/database seed

# Takes a backup of the database
yarn workspace @widgetbot/database backup

# Restores from backup of database
yarn workspace @widgetbot/database restore

# Resets the database
yarn workspace @widgetbot/database reset

# Deploys the database to prisma
yarn workspace @widgetbot/database deploy

# Runs a codegen and compiles this module
yarn workspace @widgetbot/database build
```

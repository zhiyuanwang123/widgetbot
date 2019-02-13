export const typeDefs = /* GraphQL */ `type AggregateConnection {
  count: Int!
}

type AggregateGuild {
  count: Int!
}

type AggregateGuildBan {
  count: Int!
}

type AggregateGuildGuest {
  count: Int!
}

type AggregateProfile {
  count: Int!
}

type AggregateTheme {
  count: Int!
}

type AggregateThemeColors {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Connection {
  type: String!
  data: String!
}

type ConnectionConnection {
  pageInfo: PageInfo!
  edges: [ConnectionEdge]!
  aggregate: AggregateConnection!
}

input ConnectionCreateInput {
  type: String!
  data: String!
}

input ConnectionCreateManyInput {
  create: [ConnectionCreateInput!]
}

type ConnectionEdge {
  node: Connection!
  cursor: String!
}

enum ConnectionOrderByInput {
  type_ASC
  type_DESC
  data_ASC
  data_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ConnectionPreviousValues {
  type: String!
  data: String!
}

input ConnectionScalarWhereInput {
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  data: String
  data_not: String
  data_in: [String!]
  data_not_in: [String!]
  data_lt: String
  data_lte: String
  data_gt: String
  data_gte: String
  data_contains: String
  data_not_contains: String
  data_starts_with: String
  data_not_starts_with: String
  data_ends_with: String
  data_not_ends_with: String
  AND: [ConnectionScalarWhereInput!]
  OR: [ConnectionScalarWhereInput!]
  NOT: [ConnectionScalarWhereInput!]
}

type ConnectionSubscriptionPayload {
  mutation: MutationType!
  node: Connection
  updatedFields: [String!]
  previousValues: ConnectionPreviousValues
}

input ConnectionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConnectionWhereInput
  AND: [ConnectionSubscriptionWhereInput!]
  OR: [ConnectionSubscriptionWhereInput!]
  NOT: [ConnectionSubscriptionWhereInput!]
}

input ConnectionUpdateManyDataInput {
  type: String
  data: String
}

input ConnectionUpdateManyInput {
  create: [ConnectionCreateInput!]
  deleteMany: [ConnectionScalarWhereInput!]
  updateMany: [ConnectionUpdateManyWithWhereNestedInput!]
}

input ConnectionUpdateManyMutationInput {
  type: String
  data: String
}

input ConnectionUpdateManyWithWhereNestedInput {
  where: ConnectionScalarWhereInput!
  data: ConnectionUpdateManyDataInput!
}

input ConnectionWhereInput {
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  data: String
  data_not: String
  data_in: [String!]
  data_not_in: [String!]
  data_lt: String
  data_lte: String
  data_gt: String
  data_gte: String
  data_contains: String
  data_not_contains: String
  data_starts_with: String
  data_not_starts_with: String
  data_ends_with: String
  data_not_ends_with: String
  AND: [ConnectionWhereInput!]
  OR: [ConnectionWhereInput!]
  NOT: [ConnectionWhereInput!]
}

type Guild {
  id: ID!
  theme: Theme
  guests(where: GuildGuestWhereInput, orderBy: GuildGuestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GuildGuest!]
  bans(where: GuildBanWhereInput, orderBy: GuildBanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GuildBan!]
}

type GuildBan {
  guild: Guild!
  type: String!
  data: String!
}

type GuildBanConnection {
  pageInfo: PageInfo!
  edges: [GuildBanEdge]!
  aggregate: AggregateGuildBan!
}

input GuildBanCreateInput {
  guild: GuildCreateOneWithoutBansInput!
  type: String!
  data: String!
}

input GuildBanCreateManyWithoutGuildInput {
  create: [GuildBanCreateWithoutGuildInput!]
}

input GuildBanCreateWithoutGuildInput {
  type: String!
  data: String!
}

type GuildBanEdge {
  node: GuildBan!
  cursor: String!
}

enum GuildBanOrderByInput {
  type_ASC
  type_DESC
  data_ASC
  data_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GuildBanPreviousValues {
  type: String!
  data: String!
}

input GuildBanScalarWhereInput {
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  data: String
  data_not: String
  data_in: [String!]
  data_not_in: [String!]
  data_lt: String
  data_lte: String
  data_gt: String
  data_gte: String
  data_contains: String
  data_not_contains: String
  data_starts_with: String
  data_not_starts_with: String
  data_ends_with: String
  data_not_ends_with: String
  AND: [GuildBanScalarWhereInput!]
  OR: [GuildBanScalarWhereInput!]
  NOT: [GuildBanScalarWhereInput!]
}

type GuildBanSubscriptionPayload {
  mutation: MutationType!
  node: GuildBan
  updatedFields: [String!]
  previousValues: GuildBanPreviousValues
}

input GuildBanSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GuildBanWhereInput
  AND: [GuildBanSubscriptionWhereInput!]
  OR: [GuildBanSubscriptionWhereInput!]
  NOT: [GuildBanSubscriptionWhereInput!]
}

input GuildBanUpdateManyDataInput {
  type: String
  data: String
}

input GuildBanUpdateManyMutationInput {
  type: String
  data: String
}

input GuildBanUpdateManyWithoutGuildInput {
  create: [GuildBanCreateWithoutGuildInput!]
  deleteMany: [GuildBanScalarWhereInput!]
  updateMany: [GuildBanUpdateManyWithWhereNestedInput!]
}

input GuildBanUpdateManyWithWhereNestedInput {
  where: GuildBanScalarWhereInput!
  data: GuildBanUpdateManyDataInput!
}

input GuildBanWhereInput {
  guild: GuildWhereInput
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  data: String
  data_not: String
  data_in: [String!]
  data_not_in: [String!]
  data_lt: String
  data_lte: String
  data_gt: String
  data_gte: String
  data_contains: String
  data_not_contains: String
  data_starts_with: String
  data_not_starts_with: String
  data_ends_with: String
  data_not_ends_with: String
  AND: [GuildBanWhereInput!]
  OR: [GuildBanWhereInput!]
  NOT: [GuildBanWhereInput!]
}

type GuildConnection {
  pageInfo: PageInfo!
  edges: [GuildEdge]!
  aggregate: AggregateGuild!
}

input GuildCreateInput {
  theme: ThemeCreateOneWithoutGuildsInput
  guests: GuildGuestCreateManyWithoutGuildInput
  bans: GuildBanCreateManyWithoutGuildInput
}

input GuildCreateManyWithoutThemeInput {
  create: [GuildCreateWithoutThemeInput!]
  connect: [GuildWhereUniqueInput!]
}

input GuildCreateOneWithoutBansInput {
  create: GuildCreateWithoutBansInput
  connect: GuildWhereUniqueInput
}

input GuildCreateOneWithoutGuestsInput {
  create: GuildCreateWithoutGuestsInput
  connect: GuildWhereUniqueInput
}

input GuildCreateWithoutBansInput {
  theme: ThemeCreateOneWithoutGuildsInput
  guests: GuildGuestCreateManyWithoutGuildInput
}

input GuildCreateWithoutGuestsInput {
  theme: ThemeCreateOneWithoutGuildsInput
  bans: GuildBanCreateManyWithoutGuildInput
}

input GuildCreateWithoutThemeInput {
  guests: GuildGuestCreateManyWithoutGuildInput
  bans: GuildBanCreateManyWithoutGuildInput
}

type GuildEdge {
  node: Guild!
  cursor: String!
}

type GuildGuest {
  guild: Guild!
  profile: Profile!
  nickname: String
}

type GuildGuestConnection {
  pageInfo: PageInfo!
  edges: [GuildGuestEdge]!
  aggregate: AggregateGuildGuest!
}

input GuildGuestCreateInput {
  guild: GuildCreateOneWithoutGuestsInput!
  profile: ProfileCreateOneInput!
  nickname: String
}

input GuildGuestCreateManyWithoutGuildInput {
  create: [GuildGuestCreateWithoutGuildInput!]
}

input GuildGuestCreateWithoutGuildInput {
  profile: ProfileCreateOneInput!
  nickname: String
}

type GuildGuestEdge {
  node: GuildGuest!
  cursor: String!
}

enum GuildGuestOrderByInput {
  nickname_ASC
  nickname_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GuildGuestPreviousValues {
  nickname: String
}

input GuildGuestScalarWhereInput {
  nickname: String
  nickname_not: String
  nickname_in: [String!]
  nickname_not_in: [String!]
  nickname_lt: String
  nickname_lte: String
  nickname_gt: String
  nickname_gte: String
  nickname_contains: String
  nickname_not_contains: String
  nickname_starts_with: String
  nickname_not_starts_with: String
  nickname_ends_with: String
  nickname_not_ends_with: String
  AND: [GuildGuestScalarWhereInput!]
  OR: [GuildGuestScalarWhereInput!]
  NOT: [GuildGuestScalarWhereInput!]
}

type GuildGuestSubscriptionPayload {
  mutation: MutationType!
  node: GuildGuest
  updatedFields: [String!]
  previousValues: GuildGuestPreviousValues
}

input GuildGuestSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GuildGuestWhereInput
  AND: [GuildGuestSubscriptionWhereInput!]
  OR: [GuildGuestSubscriptionWhereInput!]
  NOT: [GuildGuestSubscriptionWhereInput!]
}

input GuildGuestUpdateManyDataInput {
  nickname: String
}

input GuildGuestUpdateManyMutationInput {
  nickname: String
}

input GuildGuestUpdateManyWithoutGuildInput {
  create: [GuildGuestCreateWithoutGuildInput!]
  deleteMany: [GuildGuestScalarWhereInput!]
  updateMany: [GuildGuestUpdateManyWithWhereNestedInput!]
}

input GuildGuestUpdateManyWithWhereNestedInput {
  where: GuildGuestScalarWhereInput!
  data: GuildGuestUpdateManyDataInput!
}

input GuildGuestWhereInput {
  guild: GuildWhereInput
  profile: ProfileWhereInput
  nickname: String
  nickname_not: String
  nickname_in: [String!]
  nickname_not_in: [String!]
  nickname_lt: String
  nickname_lte: String
  nickname_gt: String
  nickname_gte: String
  nickname_contains: String
  nickname_not_contains: String
  nickname_starts_with: String
  nickname_not_starts_with: String
  nickname_ends_with: String
  nickname_not_ends_with: String
  AND: [GuildGuestWhereInput!]
  OR: [GuildGuestWhereInput!]
  NOT: [GuildGuestWhereInput!]
}

enum GuildOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GuildPreviousValues {
  id: ID!
}

input GuildScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [GuildScalarWhereInput!]
  OR: [GuildScalarWhereInput!]
  NOT: [GuildScalarWhereInput!]
}

type GuildSubscriptionPayload {
  mutation: MutationType!
  node: Guild
  updatedFields: [String!]
  previousValues: GuildPreviousValues
}

input GuildSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GuildWhereInput
  AND: [GuildSubscriptionWhereInput!]
  OR: [GuildSubscriptionWhereInput!]
  NOT: [GuildSubscriptionWhereInput!]
}

input GuildUpdateInput {
  theme: ThemeUpdateOneWithoutGuildsInput
  guests: GuildGuestUpdateManyWithoutGuildInput
  bans: GuildBanUpdateManyWithoutGuildInput
}

input GuildUpdateManyWithoutThemeInput {
  create: [GuildCreateWithoutThemeInput!]
  delete: [GuildWhereUniqueInput!]
  connect: [GuildWhereUniqueInput!]
  set: [GuildWhereUniqueInput!]
  disconnect: [GuildWhereUniqueInput!]
  update: [GuildUpdateWithWhereUniqueWithoutThemeInput!]
  upsert: [GuildUpsertWithWhereUniqueWithoutThemeInput!]
  deleteMany: [GuildScalarWhereInput!]
}

input GuildUpdateWithoutThemeDataInput {
  guests: GuildGuestUpdateManyWithoutGuildInput
  bans: GuildBanUpdateManyWithoutGuildInput
}

input GuildUpdateWithWhereUniqueWithoutThemeInput {
  where: GuildWhereUniqueInput!
  data: GuildUpdateWithoutThemeDataInput!
}

input GuildUpsertWithWhereUniqueWithoutThemeInput {
  where: GuildWhereUniqueInput!
  update: GuildUpdateWithoutThemeDataInput!
  create: GuildCreateWithoutThemeInput!
}

input GuildWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  theme: ThemeWhereInput
  guests_every: GuildGuestWhereInput
  guests_some: GuildGuestWhereInput
  guests_none: GuildGuestWhereInput
  bans_every: GuildBanWhereInput
  bans_some: GuildBanWhereInput
  bans_none: GuildBanWhereInput
  AND: [GuildWhereInput!]
  OR: [GuildWhereInput!]
  NOT: [GuildWhereInput!]
}

input GuildWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createConnection(data: ConnectionCreateInput!): Connection!
  updateManyConnections(data: ConnectionUpdateManyMutationInput!, where: ConnectionWhereInput): BatchPayload!
  deleteManyConnections(where: ConnectionWhereInput): BatchPayload!
  createGuild(data: GuildCreateInput!): Guild!
  updateGuild(data: GuildUpdateInput!, where: GuildWhereUniqueInput!): Guild
  upsertGuild(where: GuildWhereUniqueInput!, create: GuildCreateInput!, update: GuildUpdateInput!): Guild!
  deleteGuild(where: GuildWhereUniqueInput!): Guild
  deleteManyGuilds(where: GuildWhereInput): BatchPayload!
  createGuildBan(data: GuildBanCreateInput!): GuildBan!
  updateManyGuildBans(data: GuildBanUpdateManyMutationInput!, where: GuildBanWhereInput): BatchPayload!
  deleteManyGuildBans(where: GuildBanWhereInput): BatchPayload!
  createGuildGuest(data: GuildGuestCreateInput!): GuildGuest!
  updateManyGuildGuests(data: GuildGuestUpdateManyMutationInput!, where: GuildGuestWhereInput): BatchPayload!
  deleteManyGuildGuests(where: GuildGuestWhereInput): BatchPayload!
  createProfile(data: ProfileCreateInput!): Profile!
  updateProfile(data: ProfileUpdateInput!, where: ProfileWhereUniqueInput!): Profile
  updateManyProfiles(data: ProfileUpdateManyMutationInput!, where: ProfileWhereInput): BatchPayload!
  upsertProfile(where: ProfileWhereUniqueInput!, create: ProfileCreateInput!, update: ProfileUpdateInput!): Profile!
  deleteProfile(where: ProfileWhereUniqueInput!): Profile
  deleteManyProfiles(where: ProfileWhereInput): BatchPayload!
  createTheme(data: ThemeCreateInput!): Theme!
  updateTheme(data: ThemeUpdateInput!, where: ThemeWhereUniqueInput!): Theme
  updateManyThemes(data: ThemeUpdateManyMutationInput!, where: ThemeWhereInput): BatchPayload!
  upsertTheme(where: ThemeWhereUniqueInput!, create: ThemeCreateInput!, update: ThemeUpdateInput!): Theme!
  deleteTheme(where: ThemeWhereUniqueInput!): Theme
  deleteManyThemes(where: ThemeWhereInput): BatchPayload!
  createThemeColors(data: ThemeColorsCreateInput!): ThemeColors!
  updateManyThemeColorses(data: ThemeColorsUpdateManyMutationInput!, where: ThemeColorsWhereInput): BatchPayload!
  deleteManyThemeColorses(where: ThemeColorsWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Profile {
  id: ID!
  username: String!
  avatarURL: String
  connections(where: ConnectionWhereInput, orderBy: ConnectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Connection!]
  email: String
}

type ProfileConnection {
  pageInfo: PageInfo!
  edges: [ProfileEdge]!
  aggregate: AggregateProfile!
}

input ProfileCreateInput {
  username: String!
  avatarURL: String
  connections: ConnectionCreateManyInput
  email: String
}

input ProfileCreateOneInput {
  create: ProfileCreateInput
  connect: ProfileWhereUniqueInput
}

type ProfileEdge {
  node: Profile!
  cursor: String!
}

enum ProfileOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  avatarURL_ASC
  avatarURL_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProfilePreviousValues {
  id: ID!
  username: String!
  avatarURL: String
  email: String
}

type ProfileSubscriptionPayload {
  mutation: MutationType!
  node: Profile
  updatedFields: [String!]
  previousValues: ProfilePreviousValues
}

input ProfileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProfileWhereInput
  AND: [ProfileSubscriptionWhereInput!]
  OR: [ProfileSubscriptionWhereInput!]
  NOT: [ProfileSubscriptionWhereInput!]
}

input ProfileUpdateInput {
  username: String
  avatarURL: String
  connections: ConnectionUpdateManyInput
  email: String
}

input ProfileUpdateManyMutationInput {
  username: String
  avatarURL: String
  email: String
}

input ProfileWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  avatarURL: String
  avatarURL_not: String
  avatarURL_in: [String!]
  avatarURL_not_in: [String!]
  avatarURL_lt: String
  avatarURL_lte: String
  avatarURL_gt: String
  avatarURL_gte: String
  avatarURL_contains: String
  avatarURL_not_contains: String
  avatarURL_starts_with: String
  avatarURL_not_starts_with: String
  avatarURL_ends_with: String
  avatarURL_not_ends_with: String
  connections_every: ConnectionWhereInput
  connections_some: ConnectionWhereInput
  connections_none: ConnectionWhereInput
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  AND: [ProfileWhereInput!]
  OR: [ProfileWhereInput!]
  NOT: [ProfileWhereInput!]
}

input ProfileWhereUniqueInput {
  id: ID
}

type Query {
  connections(where: ConnectionWhereInput, orderBy: ConnectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Connection]!
  connectionsConnection(where: ConnectionWhereInput, orderBy: ConnectionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConnectionConnection!
  guild(where: GuildWhereUniqueInput!): Guild
  guilds(where: GuildWhereInput, orderBy: GuildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Guild]!
  guildsConnection(where: GuildWhereInput, orderBy: GuildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GuildConnection!
  guildBans(where: GuildBanWhereInput, orderBy: GuildBanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GuildBan]!
  guildBansConnection(where: GuildBanWhereInput, orderBy: GuildBanOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GuildBanConnection!
  guildGuests(where: GuildGuestWhereInput, orderBy: GuildGuestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GuildGuest]!
  guildGuestsConnection(where: GuildGuestWhereInput, orderBy: GuildGuestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GuildGuestConnection!
  profile(where: ProfileWhereUniqueInput!): Profile
  profiles(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Profile]!
  profilesConnection(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileConnection!
  theme(where: ThemeWhereUniqueInput!): Theme
  themes(where: ThemeWhereInput, orderBy: ThemeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Theme]!
  themesConnection(where: ThemeWhereInput, orderBy: ThemeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThemeConnection!
  themeColorses(where: ThemeColorsWhereInput, orderBy: ThemeColorsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ThemeColors]!
  themeColorsesConnection(where: ThemeColorsWhereInput, orderBy: ThemeColorsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThemeColorsConnection!
  node(id: ID!): Node
}

type Subscription {
  connection(where: ConnectionSubscriptionWhereInput): ConnectionSubscriptionPayload
  guild(where: GuildSubscriptionWhereInput): GuildSubscriptionPayload
  guildBan(where: GuildBanSubscriptionWhereInput): GuildBanSubscriptionPayload
  guildGuest(where: GuildGuestSubscriptionWhereInput): GuildGuestSubscriptionPayload
  profile(where: ProfileSubscriptionWhereInput): ProfileSubscriptionPayload
  theme(where: ThemeSubscriptionWhereInput): ThemeSubscriptionPayload
  themeColors(where: ThemeColorsSubscriptionWhereInput): ThemeColorsSubscriptionPayload
}

type Theme {
  id: ID!
  guilds(where: GuildWhereInput, orderBy: GuildOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Guild!]
  css: String
  colors: ThemeColors!
}

type ThemeColors {
  primary: String
  accent: String
  background: String
}

type ThemeColorsConnection {
  pageInfo: PageInfo!
  edges: [ThemeColorsEdge]!
  aggregate: AggregateThemeColors!
}

input ThemeColorsCreateInput {
  primary: String
  accent: String
  background: String
}

input ThemeColorsCreateOneInput {
  create: ThemeColorsCreateInput
}

type ThemeColorsEdge {
  node: ThemeColors!
  cursor: String!
}

enum ThemeColorsOrderByInput {
  primary_ASC
  primary_DESC
  accent_ASC
  accent_DESC
  background_ASC
  background_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ThemeColorsPreviousValues {
  primary: String
  accent: String
  background: String
}

type ThemeColorsSubscriptionPayload {
  mutation: MutationType!
  node: ThemeColors
  updatedFields: [String!]
  previousValues: ThemeColorsPreviousValues
}

input ThemeColorsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThemeColorsWhereInput
  AND: [ThemeColorsSubscriptionWhereInput!]
  OR: [ThemeColorsSubscriptionWhereInput!]
  NOT: [ThemeColorsSubscriptionWhereInput!]
}

input ThemeColorsUpdateDataInput {
  primary: String
  accent: String
  background: String
}

input ThemeColorsUpdateManyMutationInput {
  primary: String
  accent: String
  background: String
}

input ThemeColorsUpdateOneRequiredInput {
  create: ThemeColorsCreateInput
  update: ThemeColorsUpdateDataInput
  upsert: ThemeColorsUpsertNestedInput
}

input ThemeColorsUpsertNestedInput {
  update: ThemeColorsUpdateDataInput!
  create: ThemeColorsCreateInput!
}

input ThemeColorsWhereInput {
  primary: String
  primary_not: String
  primary_in: [String!]
  primary_not_in: [String!]
  primary_lt: String
  primary_lte: String
  primary_gt: String
  primary_gte: String
  primary_contains: String
  primary_not_contains: String
  primary_starts_with: String
  primary_not_starts_with: String
  primary_ends_with: String
  primary_not_ends_with: String
  accent: String
  accent_not: String
  accent_in: [String!]
  accent_not_in: [String!]
  accent_lt: String
  accent_lte: String
  accent_gt: String
  accent_gte: String
  accent_contains: String
  accent_not_contains: String
  accent_starts_with: String
  accent_not_starts_with: String
  accent_ends_with: String
  accent_not_ends_with: String
  background: String
  background_not: String
  background_in: [String!]
  background_not_in: [String!]
  background_lt: String
  background_lte: String
  background_gt: String
  background_gte: String
  background_contains: String
  background_not_contains: String
  background_starts_with: String
  background_not_starts_with: String
  background_ends_with: String
  background_not_ends_with: String
  AND: [ThemeColorsWhereInput!]
  OR: [ThemeColorsWhereInput!]
  NOT: [ThemeColorsWhereInput!]
}

type ThemeConnection {
  pageInfo: PageInfo!
  edges: [ThemeEdge]!
  aggregate: AggregateTheme!
}

input ThemeCreateInput {
  guilds: GuildCreateManyWithoutThemeInput
  css: String
  colors: ThemeColorsCreateOneInput!
}

input ThemeCreateOneWithoutGuildsInput {
  create: ThemeCreateWithoutGuildsInput
  connect: ThemeWhereUniqueInput
}

input ThemeCreateWithoutGuildsInput {
  css: String
  colors: ThemeColorsCreateOneInput!
}

type ThemeEdge {
  node: Theme!
  cursor: String!
}

enum ThemeOrderByInput {
  id_ASC
  id_DESC
  css_ASC
  css_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ThemePreviousValues {
  id: ID!
  css: String
}

type ThemeSubscriptionPayload {
  mutation: MutationType!
  node: Theme
  updatedFields: [String!]
  previousValues: ThemePreviousValues
}

input ThemeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ThemeWhereInput
  AND: [ThemeSubscriptionWhereInput!]
  OR: [ThemeSubscriptionWhereInput!]
  NOT: [ThemeSubscriptionWhereInput!]
}

input ThemeUpdateInput {
  guilds: GuildUpdateManyWithoutThemeInput
  css: String
  colors: ThemeColorsUpdateOneRequiredInput
}

input ThemeUpdateManyMutationInput {
  css: String
}

input ThemeUpdateOneWithoutGuildsInput {
  create: ThemeCreateWithoutGuildsInput
  update: ThemeUpdateWithoutGuildsDataInput
  upsert: ThemeUpsertWithoutGuildsInput
  delete: Boolean
  disconnect: Boolean
  connect: ThemeWhereUniqueInput
}

input ThemeUpdateWithoutGuildsDataInput {
  css: String
  colors: ThemeColorsUpdateOneRequiredInput
}

input ThemeUpsertWithoutGuildsInput {
  update: ThemeUpdateWithoutGuildsDataInput!
  create: ThemeCreateWithoutGuildsInput!
}

input ThemeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  guilds_every: GuildWhereInput
  guilds_some: GuildWhereInput
  guilds_none: GuildWhereInput
  css: String
  css_not: String
  css_in: [String!]
  css_not_in: [String!]
  css_lt: String
  css_lte: String
  css_gt: String
  css_gte: String
  css_contains: String
  css_not_contains: String
  css_starts_with: String
  css_not_starts_with: String
  css_ends_with: String
  css_not_ends_with: String
  colors: ThemeColorsWhereInput
  AND: [ThemeWhereInput!]
  OR: [ThemeWhereInput!]
  NOT: [ThemeWhereInput!]
}

input ThemeWhereUniqueInput {
  id: ID
}
`

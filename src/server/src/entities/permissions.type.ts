import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Permissions {
  @Field() ADMINISTRATOR: boolean
  @Field() CREATE_INSTANT_INVITE: boolean
  @Field() KICK_MEMBERS: boolean
  @Field() BAN_MEMBERS: boolean
  @Field() MANAGE_CHANNELS: boolean
  @Field() MANAGE_GUILD: boolean
  @Field() ADD_REACTIONS: boolean
  @Field() VIEW_AUDIT_LOG: boolean
  @Field() VIEW_CHANNEL: number
  @Field() READ_MESSAGES: boolean
  @Field() SEND_MESSAGES: boolean
  @Field() SEND_TTS_MESSAGES: boolean
  @Field() MANAGE_MESSAGES: boolean
  @Field() EMBED_LINKS: boolean
  @Field() ATTACH_FILES: boolean
  @Field() READ_MESSAGE_HISTORY: boolean
  @Field() MENTION_EVERYONE: boolean
  @Field() USE_EXTERNAL_EMOJIS: boolean
  @Field() EXTERNAL_EMOJIS: boolean
  @Field() CONNECT: boolean
  @Field() SPEAK: boolean
  @Field() MUTE_MEMBERS: boolean
  @Field() DEAFEN_MEMBERS: boolean
  @Field() MOVE_MEMBERS: boolean
  @Field() USE_VAD: boolean
  @Field() CHANGE_NICKNAME: boolean
  @Field() MANAGE_NICKNAMES: boolean
  @Field() MANAGE_ROLES: boolean
  @Field() MANAGE_ROLES_OR_PERMISSIONS: boolean
  @Field() MANAGE_WEBHOOKS: boolean
  @Field() MANAGE_EMOJIS: boolean
}

export default Permissions

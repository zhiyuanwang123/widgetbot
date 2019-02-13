import { PermissionObject, Permissions } from '@widgetbot/discord.js'
import fetchChannel from 'engine/util/fetchChannel'

import flags from './flags'

interface Request {
  server: string
  channel: string
  snowflake: string
}

async function rolePerms({ snowflake, ...req }: Request) {
  const { guild, channel } = await fetchChannel(req, null)
  const permissions = new Map(flags)

  // Attempt to get the overwrites for the channel
  const overwrites = channel.permissionOverwrites.get(snowflake)

  if (overwrites) {
    // Access overwrites as high-level API
    const allowed = new Permissions(overwrites.allowed)
    const denied = new Permissions(overwrites.denied)

    // Iterate through the permissions and add them to the object
    permissions.forEach((_, permission) => {
      permissions.set(
        permission,
        denied.has(permission) ? false : allowed.has(permission) ? true : null
      )
    })
  }

  // Resolve all null permissions
  const role = guild.roles.get(snowflake)
  if (role) {
    const perms = new Permissions(role.permissions)

    permissions.forEach((value, permission) => {
      if (value === null) {
        permissions.set(permission, perms.has(permission))
      }
    })
  }

  const permissionObject = {} as Required<PermissionObject>
  permissions.forEach((v, k) => (permissionObject[k] = v))
  return permissionObject
}

export default rolePerms

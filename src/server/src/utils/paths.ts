import path from 'path'

const dev = process.env.NODE_ENV === 'development'
const cwd = dir => path.join(process.cwd(), dir)

export const data = cwd('./data/')
export const embed = cwd(dev ? '../embed/build/' : './www/channels/')
export const configurator = cwd(dev ? '../configurator/public/' : './www/')

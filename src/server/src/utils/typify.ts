/**
 * Converts an object into an instance of a class.
 * Only overwrites keys that don't already exist
 *
 * @param type An instantiated class or one to be instantiated
 * @param object The JS object to be applied to the class
 */
const typify = <T extends any, O extends Object>(
  Class: T,
  target: O
): T & O => {
  if (!Class) return undefined
  const obj = Class.constructor === Function ? new Class() : Class

  const proxy = new Proxy(obj, {
    get(obj, prop) {
      return prop in obj ? obj[prop] : target[prop]
    }
  })

  return proxy
}

export default typify

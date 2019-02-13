type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

interface Constructable<T = any> {
  new (...args): T
  prototype: T
}

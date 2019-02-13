const aggregate = <T>(name: string, baseClass: T, ...mixins): T => {
  class base extends (baseClass as any) {
    constructor(...args) {
      super(...args)
      mixins.forEach(mixin => {
        copyProps(this, new mixin())
      })
    }
  }

  Object.defineProperty(base, 'name', {
    value: name,
    writable: false
  })

  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source) as any)
      .forEach(prop => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            Object.getOwnPropertyDescriptor(source, prop)
          )
      })
  }
  mixins.forEach(mixin => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype)
    copyProps(base, mixin)
  })
  return base as any
}

export default aggregate

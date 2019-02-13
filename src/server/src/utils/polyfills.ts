import 'reflect-metadata'
import 'source-map-support/register'

// Pretty print unhandled rejections
process.on('unhandledRejection', promise => console.error(promise))

const webpack = typeof __webpack_require__ === 'function'

// Webpack polyfills
if (!webpack) require('tsconfig-paths/register')

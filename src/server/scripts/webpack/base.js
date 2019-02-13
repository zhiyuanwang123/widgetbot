const path = require('path')
const chalk = require('chalk').default
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const nodeExternals = require('webpack-node-externals')

console.log(
  chalk.magentaBright(
    ` _      ___    __         __  ___       __ \n| | /| / (_)__/ /__ ____ / /_/ _ )___  / /_\n| |/ |/ / / _  / _ \`/ -_) __/ _  / _ \\/ __/\n|__/|__/_/\\_,_/\\_, /\__/\\__/____/\\___/\\__/ \n              /___/                       \n`
  )
)

module.exports = (overrides = {}) => ({
  ...overrides,
  mode: overrides.mode === 'development' ? 'development' : 'none',
  entry: ['./src/server.ts', ...(overrides.entry || [])],
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.join(__dirname, '.cache')
            }
          },
          { loader: 'awesome-typescript-loader' }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    ...(overrides.plugins || []),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${overrides.mode}"`
      }
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: 'inline-source-map',
  resolve: {
    plugins: [new TsConfigPathsPlugin()],
    extensions: ['.ts', '.js', '.mjs']
  }
})

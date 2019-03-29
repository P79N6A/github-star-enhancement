const common = require('./webpack.common.js')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let apiEndpoint = process.env['API_ENDPOINT']
let graphqlEndpoint = process.env['GRAPHQL_ENDPOINT']
// let app_key = process.env['APP_KEY']
// let app_secret = process.env['APP_SECRET']

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
    })],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API_ENDPOINT': JSON.stringify(apiEndpoint),
        'GRAPHQL_ENDPOINT': JSON.stringify(graphqlEndpoint),
        // 'APP_KEY': JSON.stringify(app_key),
        // 'APP_SECRET': JSON.stringify(app_secret),
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
})

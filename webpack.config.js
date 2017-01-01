
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/client/index_client.html`,
  filename: 'index.html',
  inject: 'body',
});

const webpack = require('webpack')



module.exports = {
  entry: [
    './client/index_client.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$\\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/src`,
        exclude: /bundle\.js$/
      }
    ],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    },{
      test: /\.(jpg|png)$/,
      loader: 'url-loader?limit=100000'
    }],
  },
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    HTMLWebpackPluginConfig,

  ],
}

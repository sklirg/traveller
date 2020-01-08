const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './src/index',
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Traveller",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.EnvironmentPlugin({
      firebase_api_key: '',
      firebase_auth_domain: '',
      firebase_project_id: '',
      mapbox_token: '',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

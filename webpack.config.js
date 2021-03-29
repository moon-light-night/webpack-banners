const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000000',
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false,
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false,
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2,
                }),
                require('imagemin-svgo')({
                  plugins: [{ removeTitle: true }, { convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
}

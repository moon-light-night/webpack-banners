const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
// const dev = true
// const devFalse = false
// const isWatch = NODE_ENV ? devTrue : devFalse

module.exports = {
  context: path.resolve(__dirname, 'src'),
  // mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    // new BrowserSyncPlugin({
    //   // browse to http://localhost:3000/ during development,
    //   // ./public directory is being served
    //   host: 'localhost',
    //   port: 4000,
    //   // proxy: 'http://localhost:8080/',
    //   server: { baseDir: ['dist'] },
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin(),
  ],

  // watch:
  //   (NODE_ENV === 'inline' ? true : false) ||
  //   (NODE_ENV === 'production' ? false : true),

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // type:
        // NODE_ENV === 'build_not_inline' ? 'asset/resource' : 'asset/inline',

        use: [
          //if you need to use inline images
          NODE_ENV === 'build_inline'
            ? 'url-loader?limit=10000000'
            : 'url-loader?limit=1',
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-jpegtran')({
                  progressive: true,
                  arithmetic: true,
                }),
                require('imagemin-gifsicle')({
                  interlaced: false,
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false,
                  overshoot: true,
                  QuantBaseline: true,
                }),
                require('imagemin-pngquant')({
                  quality: [0, 0.6],
                  speed: 1,
                }),
                require('imagemin-svgo')({
                  plugins: [{ removeTitle: true }, { convertPathData: false }],
                }),
              ],
            },
          },
        ],
      },
      //if you need to use only css
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './src',
  },
}

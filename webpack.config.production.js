const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");

const plugins = [];

module.exports = function webpackMain() {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false
    })
  );

  plugins.push(
    new webpack.DefinePlugin({
      apiURL: JSON.stringify('http://<server-url>/api/'),
      process: { env: { NODE_ENV: JSON.stringify('production') } }
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'node-static.js',
      minChunks(module, count) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  );

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks(module, count) {
        return count >= 2;
      }
    })
  );

  // plugins.push(
  //   new CompressionPlugin({
  //     asset: "[path].gz[query]",
  //     algorithm: "gzip",
  //     test: /\.(js)$/,
  //     threshold: 10240,
  //     minRatio: 0.8
  //   })
  // );

  plugins.push(
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  );

  plugins.push(
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '200.html'
    })
  );

  return settings;
};

const settings = {
  entry: {
    main: './src/index.js'
  },

  output: {
    filename: '[name]-bundle.[chunkhash].js',
    chunkFilename: '[name]-chunk.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./node_modules')]
  },

  // devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        use: ['babel-loader'],
        include: [path.resolve('./src'), path.resolve('./node_modules/ansi-styles')]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ],
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
      }
    ]
  },

  plugins
};

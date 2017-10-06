const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [];

module.exports = function webpackMain() {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());

  // plugins.push(new BundleAnalyzerPlugin({
  //   analyzerMode: 'static'
  // }));
  plugins.push(
    new webpack.DefinePlugin({
      apiURL: JSON.stringify('http://localhost:4000/api/'),
      process: { env: { NODE_ENV: JSON.stringify('') } }
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

  plugins.push(
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  );

  return settings;
};

const settings = {
  context: __dirname,

  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },

  output: {
    filename: '[name]-bundle.[hash].js',
    chunkFilename: '[name]-chunk.[hash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./node_modules')],
    alias: {
      chatFeature: path.resolve(__dirname, 'src/features/chat'),
      appFeature: path.resolve(__dirname, 'src/features/app'),
      authFeature: path.resolve(__dirname, 'src/features/auth'),
      departmentFeature: path.resolve(__dirname, 'src/features/department_tree'),
      positionFeature: path.resolve(__dirname, 'src/features/position_tree'),
      dialogFeature: path.resolve(__dirname, 'src/features/dialogs'),
      snackbarFeature: path.resolve(__dirname, 'src/features/snackbar')
    }
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve('./src')],
        loader: 'babel-loader'
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

  devtool: 'eval',
  performance: { hints: false },
  plugins,

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true
  }
};

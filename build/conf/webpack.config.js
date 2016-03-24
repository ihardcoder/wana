var path = require('path');
// var CleanWebpackPlugin = require('clean-webpack-plugin');

var releaseDir = path.join(__dirname, '/../../release');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0'],
        plugins: ['syntax-object-rest-spread']
      }
    }]
  },
  entry: {
    wa: path.join(__dirname, '/../../src/index.sync.js'),
    waAsync: __dirname + '/../../src/index.async.js'
  },
  output: {
    path: releaseDir,
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
    libraryTarget: 'umd'
  },
  plugins: [
    // new CleanWebpackPlugin(['release'], {
    //   root: path.join(__dirname, '/../../'),
    //   verbose: true,
    //   dry: true
    // })
  ],
  devtool: ['source-map']
};
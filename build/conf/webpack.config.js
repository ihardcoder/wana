var path = require('path');

module.exports = {
    module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        presets: ['es2015','stage-0'],
        plugins: ['syntax-object-rest-spread']
      }
    }]
  },
  entry: {
    wa: path.join(__dirname, '/../../src/index.sync.js'),
    waAsync: __dirname + '/../../src/index.async.js'
  },
  output: {
    path: path.join(__dirname, '/../../release'),
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
    libraryTarget: 'umd'
  },
  plugins: [],
  devtool: ['source-map']
};

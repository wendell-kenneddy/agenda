const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: __dirname + '/frontend/scripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public', 'assets', 'scripts')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};

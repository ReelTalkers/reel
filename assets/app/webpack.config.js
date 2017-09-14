module.exports = {
  entry: './modules/main.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    host: "localhost",
    port: 8080,
    https: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};

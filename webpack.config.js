const path = require('path');

module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: path.resolve(__dirname, "src/assets/javascripts/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'webpack/components/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  mode: 'development'
};

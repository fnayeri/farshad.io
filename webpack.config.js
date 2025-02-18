const path = require('path');

module.exports = {
  // webpack folder’s entry js — excluded from jekyll’s build process.
  // entry: "./webpack/entry.js",
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    // if using GitHub Pages, use the following:
    // path: path.resolve(__dirname, "assets/javascripts"),
    path: path.resolve(__dirname, "src/assets/javascripts/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader", // "babel-loader" is the correct name
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'webpack/components/')
    },
    extensions: ['.js', '.jsx']
  },
  mode: 'development'
};

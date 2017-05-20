var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/index.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_module|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-0"],
          plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
        }
      }
    ]
  },
  devServer: {
    host: "172.18.0.2",
    port: 8080,
    disableHostCheck: true
  },
  output: {
    path: __dirname + "/src/",
    filename: "index.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

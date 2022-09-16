module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  target: "webworker",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

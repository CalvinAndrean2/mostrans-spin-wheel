const path = require("path");

module.exports = {
  // Your existing config...
  module: {
    rules: [
      {
        test: /\.(mp3|wav|ogg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/", // Customize output path
          },
        },
      },
      // Other rules...
    ],
  },
  // More config...
};

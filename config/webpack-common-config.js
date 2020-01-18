const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const paths = require("./paths");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ],
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
    // Aliases help with shortening relative paths
    // 'Components/button' === '../../../components/button'
    alias: {
      Components: path.resolve(paths.appSrc, "components"),
      Actions: path.resolve(paths.appSrc, "actions/"),
      Containers: path.resolve(paths.appSrc, "containers"),
      Reducers: path.resolve(paths.appSrc, "reducers"),
      Pictos: path.resolve(paths.appAssets,'pictos/'),
      Fonts: path.resolve(paths.appSrc,'fonts'),
      Utils: path.resolve(paths.appSrc, "utils")
    }
  },
  
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        use: ["file-loader"]
      },
      {
      test: /\.(woff|woff2|ttf)$/,
      use: 'url-loader'
    }
    ]
  }
};
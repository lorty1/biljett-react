const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const paths = require("./paths");
// import common webpack config
const common = require("./webpack-common-config.js");

module.exports = merge(common, {
    entry: [paths.appIndexJs],
    mode: "development",
    devtool: "eval",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            }
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: 'react',
            Axios: 'axios',
            ReactDom: 'react-dom'
        })
    ],
    module: {
        rules: [
            {
                // look for .js or .jsx files
                test: /\.(js|jsx)$/,
                // in the `src` directory
                include: path.resolve(paths.appSrc),
                exclude: /(node_modules)/,
                use: {
                    // use babel for transpiling JavaScript files
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/react"]
                    }
                }
            },
            {
                // look for .css or .scss files
                test: /\.(css|scss)$/,
                // in the `assets` directory
                include: [path.resolve(paths.appAssets)],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    // Add additional loaders here. (e.g. sass-loader)
                    {
                        loader: "sass-loader",
                    }
                ]
            }
        ]
    }
});
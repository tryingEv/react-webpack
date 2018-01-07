const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        main: "../src/index.js"
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title: "react-webpack-test",
            template: "../index.html",
            filename: "index.html",
            hash: true,
            cache: true,
            showErrors: true
        })
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    module: {
        rules: [{
                test: /\.(js|jsx)/,
                use: [
                    "babel-loader"
                ],
                exclude: /node_modules/,
                //没有此配置编译时无法识别jsx代码
                query: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            //image resource
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: "file-loder",
            },
            //sounds resource
            {
                test: /\.(mp3|mp4)$/,
                loader: "file-loader"
            },
            //font resource
            {
                test: /\.(woff|woff2|eot|tff|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    }
};
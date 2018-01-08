const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const initPath = require("./path.js");
module.exports = {
    entry: {
        main: "./src/index.js",
        vendors: ["react", "react-dom"],
    },
    resolve:{
        extensions:[".js", ".json", ".jsx"],
        alias: {
            "react": initPath("react"),
            "react-dom": initPath("react-dom"),
        },
    },
    plugins: [       
        new HtmlWebpackPlugin({
            title: "react-webpack-test",
            template: "./index.html",
            filename: "index.html",
            hash: true,
            cache: true,
            showErrors: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendors"],
            filename: "[name].[chunkhash:8].js",
            minChunks: 2
        }),

    ],
    output: {
        filename: "[name].[chunkhash:8].js",    //生成的文件文件名会带有一个hash码
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./"
    },
    module: {
        noParse:[initPath("react"), initPath("react-dom")],
        rules: [{
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
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
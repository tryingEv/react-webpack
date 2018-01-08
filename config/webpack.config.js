const path = require('path');
const rootPath = __dirname;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Uglifyjs = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    entry:{
        main: "./src/index.js", 
        vendors: ["react", "react-dom"]
    },
    devtool: "inline-source-map",   //编译期间报错能够追溯到源码位置
    devServer:{
        contentBase: "./dist",
        hot: true,
        host: "localhost",
        port: 3000
    },
    plugins:[ 
        new CleanWebpackPlugin(["dist"]),   //每次编译时清理编译文件夹
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //在打包文件路径中编译一个html入口文件
        new HtmlWebpackPlugin({
            title: "react-webpack test",    //html title
            filename: "index.html",     //打包之后的html文件名称
            template: "./index.html",    //在创建新的html文件时的模板，会将模板的内容拷贝到生成的文件中
            hash: true, //生成的html文件名称会有一串hash码,
            cache: true, //使用缓存内容，内容变化时候才会生成新文件
            showErrors: true, //报错会把error包容在生成的html pre标签中
            // chunks: ["main"] //多个入口文件，然后将入口文件引入到生成的html文件中
        }),
        //打包时清除引用文件中未使用的代码，可以减少打包后的代码体积
        new Uglifyjs(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common", "vendors"],
            filename: "[name].js",
            minChunks: 2
        })
    ],
    output:{
        filename: "[name].js",
        path: path.resolve(rootPath, "dist"),
        publicPath: "/"     
    },
    
    module:{
        rules: [
           {
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
                use:[
                    'file-loader'
                ]
           },
           {
               test:/\.html$/,
               loader: "html-loader"
           }
        ]}

};
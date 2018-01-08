const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const webpack = require("webpack");
const devCfg = {
    devtool: "inline-source-map",   //编译期间报错能够追溯到源码位置
    devServer: {
        contentBase: "../dist",
        host: "localhost",
        port: "3000",
        hot: "true"
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(common, devCfg);
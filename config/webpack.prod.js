const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const prodCfg = {
    devtool: "source-map",
    plugins: [
        new UglifyPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ]
};

module.exports = merge(common, prodCfg);
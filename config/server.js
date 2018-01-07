const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackMiddleWare = require("webpack-dev-middleware");
// const webpackDevServer = require("webpack-dev-server");
let webpackCfg = require("./webpack.config.js");
// let options = {
//     contentBase: "./dist",
//     // hot: true,
//     host: "localhost",
//     port: 3000
// };
// webpackDevServer.addDevServerEntrypoints(webpackCfg, options);

let app = new express();
let compiler = webpack(webpackCfg);
let cfg = {
    publicPath: webpackCfg.output.publicPath,
    port: 3000
};
app.use(webpackMiddleWare(compiler, {
    publicPath: cfg.publicPath
}));

app.listen(cfg.port, function(){
    console.log("webpack-dev-middleware listening on port " + cfg.port);
})
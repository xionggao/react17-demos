/**
 * 开发环境webpack配置
 * @author xg
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devServer: {
        port: 8888, // 本地开发服务器端口
        https: false,
        historyApiFallback: true,
        hot: true, //开启模块热替换
        open: 'chrome', // 构建完成后打开浏览器
        progress: true, // 将构建进度显示到控制台
        // proxy: [{ // 开启本地服务网络代理
        //   context: ["/himea", "/py"], // 被代理url
        //   target: "http://localhost:7777", // 代理指向例如 ==> http://test/123
        // }],
        // publicPath: "./",
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

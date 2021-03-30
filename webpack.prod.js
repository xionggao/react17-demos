/**
 * 生产环境webpack配置
 * @author xg
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    output: {
        publicPath: "./"
    },
    optimization: { // webpack优化模块
        splitChunks: { // js文件分割
            chunks: 'all'
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({ // js文件压缩
                test: /\.js(\?.*)?$/i,
                parallel: true,
                cache: true,
                sourceMap: false,
                extractComments: false
            })
        ]
    }
});

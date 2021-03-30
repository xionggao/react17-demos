/**
 * webpack通用配置
 * @author xg
 */
const path = require("path");
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const theme = require('./package').theme;

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/demos/index')], // 从入口文件开始进行polyfill处理
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: { // import时自动补全文件扩展名
        extensions: ['.js', '.jsx', '.json'],
        alias: { // 引用别名
        }
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                use: [
                    {loader: 'babel-loader'}
                ],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(css|less)$/,
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/demos/asserts')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "styles",
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/demos/asserts')],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "styles",
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: theme
                            }
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[contenthash:8].[ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[hash:8].[ext]",
                            limit: 5000 // fonts file size <= 5KB, use 'base64'; else, output svg file
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 清除历史build文件
        new HtmlWebpackPlugin({ // 注入html模板,生成新的html文件
            template: path.resolve(__dirname, 'src/demos/index.html')
        }),
        new MiniCssExtractPlugin({ // css文件分割
            ignoreOrder: true,
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[name].[chunkhash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({ // css文件压缩
            cssProcessorOptions: {
                parser: safePostCssParser
            }
        }),
        new webpack.ProvidePlugin({
            '_': 'lodash'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 设置环境变量
        })
    ]
};



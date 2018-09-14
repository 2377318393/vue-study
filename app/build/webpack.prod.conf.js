const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;





module.exports = merge(common, {
    plugins: [
        new UglifyPlugin({
            uglifyOptions: {
                compress: {
                  warnings: false,
                  drop_console: true,//console
                  pure_funcs: ['console.log']//移除console
                }
            }
        }),
        new ExtractTextPlugin('./css/[name].css'),
        new BundleAnalyzerPlugin({
            analyzerPort:1234
        })
    ],
    module: {
        rules: [
            {
                test: /\.css|scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
        ],
    },
})
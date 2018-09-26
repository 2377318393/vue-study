const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        publicPath: "/",
        filename: '[name].bundle.[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: {
                    loader: 'babel-loader',
                    options : {
                        presets : ["es2015", "stage-0"]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ],
    },

    // 代码模块路径解析的配置
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, '../src')
        ],
        extensions: ['.js', '.vue', '.json', '.scss', '.less', 'jsonp'],
        alias: {
            '@'     : resolve('src'),
            'vue$'  : 'vue/dist/vue.esm.js',
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: path.resolve(__dirname, "../index.html")
        }),
    ]
}
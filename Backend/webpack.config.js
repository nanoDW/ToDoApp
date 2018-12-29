const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './src/server.js'],
    // entry: './src/server.js',
    output: {
        path: __dirname + '/dist',
        filename: 'server_bundle.js'
    },
    mode: 'production',
    target: "node",
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },
};
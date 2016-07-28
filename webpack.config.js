// REQUIRE
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PRE-CONFIG
var BUILD_DIR = path.resolve(__dirname, 'dev/client');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
    entry: APP_DIR + '/app/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'RealTimeDashboard',
            template : APP_DIR + '/index.html'
        })
    ]
};

module.exports = config;
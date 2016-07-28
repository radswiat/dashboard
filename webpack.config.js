//// REQUIRE
//var webpack = require('webpack');
//var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
//
//// PRE-CONFIG
//var BUILD_DIR = path.resolve(__dirname, 'dev/client');
//var APP_DIR = path.resolve(__dirname, 'src/client');
//
//var config = {
//
//    entry: APP_DIR + '/app/app.jsx',
//    output: {
//        path: BUILD_DIR,
//        filename: 'bundle.js'
//    },
//
//
//    module : {
//        loaders : [
//
//            {
//                test : /\.jsx?/,
//                include : APP_DIR,
//                loader : 'babel'
//            },
//            {
//                test: /\.html$/,
//                loader: "raw-loader"
//            }
//        ]
//    },
//    plugins: [
//        new HtmlWebpackPlugin()
//    ]
//};
//
//module.exports = config;






// REQUIRE
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PRE-CONFIG
var BUILD_DIR = path.resolve(__dirname, 'dev/client');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {

    entry: APP_DIR + '/app/app.tsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".jsx", ".js", ".html"]
    },

    module : {
        loaders : [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            //{
            //    test : /\.jsx?/,
            //    include : APP_DIR,
            //    loader : 'babel'
            //},
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.jsx$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'RealTimeDashboard',
            filename: 'index.html',
            template : APP_DIR + '/index.html'
        })
    ]
};

module.exports = config;
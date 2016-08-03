// REQUIRE
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

// PRE-CONFIG
var BUILD_DIR = path.resolve(__dirname, 'dev');
var APP_DIR = path.resolve(__dirname, 'src/client');
var SERVER_DIR = path.resolve(__dirname, 'src/server');

var config = {
        //entry:  SERVER_DIR + '/server.js',
        entry: [
            SERVER_DIR + '/server.ts',
        ],
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        output: {
            path: BUILD_DIR,
            filename: 'server.js',
            library: true,
            libraryTarget: 'commonjs2'
        },

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".jsx", ".js", ".html"]
        },

        module: {
            loaders: [
                {
                    test: /\.ts?$/,
                    loader: "babel-loader!ts-loader"
                },
            ]
        },
        externals: [nodeExternals()]
    };

module.exports = config;


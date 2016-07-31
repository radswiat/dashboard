// REQUIRE
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

// PRE-CONFIG
var BUILD_DIR = path.resolve(__dirname, 'dev');
var APP_DIR = path.resolve(__dirname, 'src/client');
var SERVER_DIR = path.resolve(__dirname, 'src/server');

var config = [
//////////////////////////////////////////////
// WEBPACK CLIENT BUILD
//////////////////////////////////////////////
    {

        entry: [
            APP_DIR + '/app/app.tsx'
        ],
        output: {
            path: BUILD_DIR + '/public',
            filename: 'bundle.js'
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".jsx", ".js", ".html"]
        },

        module: {
            loaders: [
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
                {test: /\.jsx$/, loader: "source-map-loader"}
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'RealTimeDashboard',
                filename: 'index.html',
                template: APP_DIR + '/index.html'
            })
        ]
    },

    //////////////////////////////////////////////
    // WEBPACK SERVER BUILD
    //////////////////////////////////////////////
    {
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
    }];

module.exports = config;


'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'dist'),
    entry: ['whatwg-fetch', './js/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'build.js'
    },
    watch: env === 'development',
    devtool: env === 'development' ? 'source-map' : false,
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            use: [
                'babel-loader',
                'eslint-loader'
            ],
            exclude: /node_modules/
        }]
    },
    plugins: env === 'production' ? [
        new CleanWebpackPlugin('public/*'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([
            { from: 'css', to: 'css' },
            { from: 'images', to: 'images' },
            { from: 'json', to: 'json' },
            { from: 'index.html', to: 'index.html' }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ] : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};

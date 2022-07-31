const path = require('path');
const webpack = require('webpack');
const CamundaModelerWebpackPlugin = require('camunda-modeler-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.js'
    },
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new CamundaModelerWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/index.js'),
                    to: path.resolve(__dirname, './dist/index.js')
                },
                {
                    from: path.resolve(__dirname, './src/menu.js'),
                    to: path.resolve(__dirname, './dist/menu.js')
                }
            ]
        })
    ]
};

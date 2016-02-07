var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/js/script.js",
    output: {
        path: __dirname + '/dist',
        filename: "synth.js"
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: __dirname + '/src',
                query: {
                    presets: ['es2015']
                }
            }, {
                test:   /\.scss/,
                loader: 'style!css!sass',
            }
        ],
    }
};

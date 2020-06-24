const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "./index.html"
});
const htmlPlugin2 = new HtmlWebPackPlugin({
    template: './about.html',
    filename: './about.html'    
});
const htmlPlugin3 = new HtmlWebPackPlugin({
    template: './log_in.html',
    filename: './log_in.html'    
});
const htmlPlugin4 = new HtmlWebPackPlugin({
    template: './activities.html',
    filename: './activities.html'    
});

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            api: path.resolve(srcPath, 'api')
        }
    },
    entry: {
        index: './index.js'
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        modules: false
                                    }
                                ],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread'
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            url: false
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
          chunks: "all"
        }
    },
    plugins: [htmlPlugin, htmlPlugin2, htmlPlugin3, htmlPlugin4],
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 7070
    },
    devtool: 'source-map'
};

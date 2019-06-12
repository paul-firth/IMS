const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist'
    },
    module:{
        rules:[{test: /\.css$/, use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpg|gif|JPG|jpeg)$/,
            use:[
                {
                    loader: 'file-loader',
                    options: {outputPath: 'assets'}
                }
            ]
        },
        {
            test: /\.(html)$/,
            use: {loader: 'html-loader'}
        },
        { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin()
        ]
};
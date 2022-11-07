; const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './public/index.js',
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './templates/index.ejs',
            scriptLoading: 'module',

        }),
        new CopyWebpackPlugin({
            patterns: [
            { from: './public/*.css',
              to({ context, absoluteFilename }) {
                return "./style.css" 
                // no need to specify 'dist' folder
                // any folder path will be created in the dist folder
              },
            }]
        })
    ],

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: path.join(__dirname, 'dist'), 
        port: 9000
    },
    mode: 'development'
}
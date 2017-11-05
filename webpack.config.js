const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const path = require('path');
module.exports = {
    watch: true,
    entry: {
        tags: './src/js/tags.js',
        home: './src/js/home.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            // compile SASS to CSS
            {
                test: /\.sass/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            // loading images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?publicPath=../&name=images/[name].[ext]'
                ]
            },
            // loading fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?publicPath=../&name=fonts/[name].[ext]'
                ]
            }
        ]
    },
    plugins: [
        extractSass
    ]
}
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "bundle_tags.css",
    disable: process.env.NODE_ENV === "development"
});

const path = require('path');
module.exports = {
    watch: true,
    entry: './src/js_tags.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle_tags.js'
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
                    'file-loader'
                ]
            },
            // loading fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        extractSass
    ]
}
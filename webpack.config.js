const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, "./lib"),
        filename: "js/wort-lu-dataviz.js",
        library: "",
        libraryTarget: "umd",
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
        lodash: "lodash"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader  : "eslint-loader",
                    options : {
                        failOnWarning: false,
                        failOnError: false,
                        formatter: require("eslint-friendly-formatter"),
                    },
                }],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
};
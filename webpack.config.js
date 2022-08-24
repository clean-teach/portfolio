const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_JS = './src/client/js/';

module.exports = {
    // mode: 'development',
    // watch: true,
    entry: {
        main: BASE_JS + 'main.ts',
        index: BASE_JS + 'index.ts',
        loadingPage: BASE_JS + 'loadingPage.ts',
        cursor: BASE_JS + 'cursor.ts',
        formSubmissionHandler: BASE_JS + 'form-submission-handler.ts',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets/dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'css/style.css',
    })],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
};
const webpack = require('webpack')
const os = require('os')
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_JS = './src/client/js/';

const isDevMode = process.env.NODE_ENV === 'development';

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
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        })
    ],
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
    // 최적화 설정
    optimization: {
        // 압축
        minimize: isDevMode ? false : true,
        // 미니마이저
        minimizer: [
        // 플러그인 인스턴스 생성
        new CssMinimizerPlugin({
            // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
            parallel: os.cpus().length - 1,
        }),
        ],
    },
};
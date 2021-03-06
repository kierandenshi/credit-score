const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const alias = () => {
    const resolve = destination => path.resolve(__dirname, 'src', destination);
    return {
        '@css': resolve('css'),
        '@redux': resolve('redux'),
        '@components': resolve('components'),
        '@test': resolve('test'),
        '@middleware': resolve('middleware'),
        '@environment': resolve('environment.js'),
        '@localisation': resolve('localisation.js'),
    };
};

module.exports = env => ({
    entry: ['react-hot-loader/patch', './src/index.js'],
    devtool: 'eval',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
        }),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' },
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env === 'production' ? 'production' : 'development'),
            },
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: alias(),
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                }),
            },
        ],
    },
});
